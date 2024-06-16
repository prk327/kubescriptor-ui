# frontend/Dockerfile
# Use the official Node.js image as the base image for the build stage
FROM node:16-alpine as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use the official Nginx image as the base image for the production stage
FROM nginx:alpine

# Copy the built React app from the build stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to allow traffic
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]