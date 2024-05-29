FROM node:latest

WORKDIR /app
COPY package*.json ./
RUN ls -la /app && cat /app/package.json # Verify file content
RUN npm install
COPY . .
CMD ["npm", "start"]
