# Use official Node.js image from Docker Hub
FROM node:alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
