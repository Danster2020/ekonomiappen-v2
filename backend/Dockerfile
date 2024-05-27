FROM node:latest

WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY ./ ./
# EXPOSE 8081
CMD ["npm", "start"]