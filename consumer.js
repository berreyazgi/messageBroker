const amqp = require('amqplib');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

async function start() {
    let connected = false;
    let conn;

    // RabbitMQ Bağlantı Döngüsü
    while (!connected) {
        try {
            conn = await amqp.connect('amqp://rabbitmq');
            connected = true;
            console.log(" [+] RabbitMQ connected.");
        } catch (err) {
            console.log(" [!] RabbitMQ waiting for connection...");
            await new Promise(res => setTimeout(res, 5000)); 
        }
    }

    const ch = await conn.createChannel();
    await ch.assertQueue('task_queue', { durable: true });

    // HTTP Sunucusu
    const server = http.createServer((req, res) => {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('index.html couldnt find: ' + filePath);
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    });

    const io = new Server(server);

    // --- BURASI EKLEMEN GEREKEN YER ---
    io.on('connection', (socket) => {
        console.log('One client connected');

        // UI'dan gelen mesajı dinle ve RabbitMQ'ya gönder
        socket.on('uiNewTask', async (data) => {
            console.log("Message received from UI:", data);
            // Mesajı kuyruğa geri gönderiyoruz
            ch.sendToQueue('task_queue', Buffer.from(JSON.stringify(data)));
        });
    });
    // ---------------------------------

    // RabbitMQ'dan gelen mesajları dinle ve UI'a gönder
    ch.consume('task_queue', (msg) => {
        const content = msg.content.toString();
        try {
            io.emit('messageReceived', JSON.parse(content));
        } catch (e) {
            // Eğer mesaj JSON değilse düz metin olarak gönder
            io.emit('messageReceived', { task: content });
        }
        ch.ack(msg);
    }, { noAck: false });

    server.listen(3000, () => console.log('UI Page: http://localhost:3000'));
}

start();