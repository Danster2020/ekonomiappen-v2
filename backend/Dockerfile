FROM node:latest

WORKDIR /app
COPY package*.json ./

# Check if package.json and package-lock.json are copied correctly
RUN echo "Contents of /app after copying package*.json:" && ls -la /app && cat /app/package.json

RUN npm install

COPY . .

# Check the final contents of /app before starting the application
RUN echo "Final contents of /app:" && ls -la /app

# CMD ["npm", "start"]
