FROM node:latest

WORKDIR /app
COPY package*.json ./
RUN ls -la /app # Added to verify files are copied
RUN npm install
COPY . .
CMD ["npm", "start"]