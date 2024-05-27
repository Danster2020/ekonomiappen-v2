FROM node:latest

WORKDIR /backend
COPY ./package*.json ./
COPY . . 

RUN npm install
COPY . .
CMD ["npm", "start"]