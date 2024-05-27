FROM node:latest

WORKDIR /backend
# COPY ./package*.json ./

# testing
COPY . . 

RUN npm install
COPY . .
CMD ["npm", "start"]