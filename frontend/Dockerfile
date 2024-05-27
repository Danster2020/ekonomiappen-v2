#FROM nginx:stable-alpine

# Stage 1: Build the frontend assets
FROM node:alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Write environment variables to .env file
ARG VITE_GOOGLE_CLIENT_ID
RUN echo "VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID" > .env
RUN echo "VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID"

# Build the application
RUN npm run build

# Stage 2: Serve the built assets using nginx
FROM nginx:stable-alpine

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
