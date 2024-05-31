FROM node:latest

RUN echo "ls Before workdir:" && ls -la

WORKDIR /usr/src/app
RUN echo "ls After workdir:" && ls -la
COPY package*.json ./
RUN echo "ls after copying package*.json:" && ls -la

RUN npm install

COPY . .

# Check the final contents of /app before starting the application
RUN echo "ls after copying everything:" && ls -la

CMD ["npm", "start"]
