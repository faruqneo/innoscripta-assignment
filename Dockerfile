# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory to the working directory in the container
COPY . .

# Build the React application
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the React application
CMD ["npm", "start"]