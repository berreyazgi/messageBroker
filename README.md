# Heterogeneous RPC Broker System

A decoupled, distributed microservices architecture demonstrating a **Request-Reply RPC pattern** using a message broker. This project bridges a **Python Client** and a **Java Handler** using high-performance serialization and centralized coordination.

---

## Architecture Overview

The system implements the **Broker Architectural Pattern** to achieve language-agnostic service coordination.

* **Message Broker:** RabbitMQ (AMQP Protocol) acts as the central post office.
* **Serialization:** Google Protocol Buffers (Protobuf) ensures the Python and Java services speak the same data language.
* **Pattern:** Asynchronous Request-Reply using `correlation_id` and `reply_to` headers.
* **Containerization:** Fully orchestrated via Docker Compose for environmental consistency.



---

## Project Structure

```text
rpc-broker-project/
├── api-contracts/           # Shared Protobuf definitions (.proto)
├── java-handler-service/    # Java backend (The Server)
│   ├── src/main/java/       # Business logic
│   ├── pom.xml              # Maven dependencies
│   └── Dockerfile           # Multi-stage Java build
├── python-client-service/   # Python frontend (The Caller)
│   ├── client_app.py        # RPC logic
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile           # Python runtime environment
└── docker-compose.yml       # Full system orchestration

Here is the updated section of your **README.md**, optimized for clarity and following the exact format you requested.

---

## 🛠️ Getting Started (Zero-Install Setup)

The entire stack is containerized. You only need **Docker** and **Docker Compose** installed on your machine.

### 1. Initialize the Project

Navigate to the root directory in your terminal:

```bash
cd rpc-broker-project

```

### 2. Launch the Stack

Build and start all services (Broker, Java Handler, and Python Client) simultaneously:

```bash
docker-compose up --build

```

### 3. Verify the Flow

Once the containers are up, observe the terminal logs. You will see:

* **RabbitMQ** initializing and exposing the AMQP port.
* **Java Handler** connecting and waiting for tasks on the `user_service_requests` queue.
* **Python Client** generating a unique UUID, sending a request, and receiving the processed response from the Java service.

---

## Observability & Management

### RabbitMQ Management Console

Monitor queue depth, message rates, and consumer connections:

* **URL:** `http://localhost:15672`
* **Username:** `guest`
* **Password:** `guest`

### Distributed Logging

To trace a specific request across the heterogeneous boundary, search the logs for its unique ID:

```bash
docker-compose logs | grep "<CORRELATION_ID>"

```

---

## Local Development Tips

### VS Code Configuration

To maintain both languages in one IDE:

* **Extensions:** Install the *Microsoft Python* and *Extension Pack for Java*.
* **Python Interpreter:** `Ctrl+Shift+P` -> `Python: Select Interpreter` -> Select your `venv`.
* **Java Setup:** Ensure `pom.xml` is recognized by Maven to enable IntelliSense for Protobuf classes.

---

## Key Technologies

* **Java 17** (Eclipse Temurin)
* **Python 3.12**
* **RabbitMQ 3.12-management**
* **Protobuf 3.25**
* **Maven** (Build Tool)

---

**Would you like me to add a section on how to scale the system by running multiple instances of the Java Handler using Docker commands?**
## Ekler

Herhangi bir ek bilgi buraya gelir

  
