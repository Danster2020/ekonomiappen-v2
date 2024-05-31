FROM node:latest

RUN echo "ls Before workdir:" && ls -la
COPY package*.json ./app
WORKDIR /app
RUN echo "ls After workdir:" && ls -la
# COPY package*.json ./
RUN echo "ls after copying package*.json:" && ls -la

# Check if package.json and package-lock.json are copied correctly
RUN echo "Contents of /app after copying package*.json:" && ls -la /app && cat /app/package.json

RUN npm install

COPY . .

# Check the final contents of /app before starting the application
RUN echo "Final contents of /app:" && ls -la /app

CMD ["npm", "start"]
