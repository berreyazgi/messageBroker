# Use a lightweight Node image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the script
COPY . .

# Run the script
EXPOSE 3000
CMD ["node", "consumer.js"]