# Base image
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the project
RUN npm run build

# Run tests
RUN npm run test:build

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["node", "dist/app.js"]
