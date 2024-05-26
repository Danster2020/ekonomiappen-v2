# Production

docker-compose:

```
version: '3.8'
services:
  mysql_srv:
    image: mysql:8.0
    container_name: mysql
    stdin_open: true
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
    ports:
      - "3306:3306"
    volumes:
      # - ./data:/var/lib/mysql
      - database-volume:/var/lib/mysql
      - ./conf:/etc/mysql/conf.d
      - ./logs:/logs

  backend_srv:
    build: 
      context: ./backend
    depends_on:
      - mysql_srv
    environment:
      SECRET_KEY: ${SECRET_KEY}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: 1234
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      DATABASE_HOST: ${DATABASE_HOST}
      CLIENT_ORIGIN: ${CLIENT_ORIGIN}

    ports:
      - 8081:8081
    volumes:
      - ./backend:/backend

  frontend_srv:
    build: 
      context: ./frontend
      args:
        - VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}
    ports:
      - 3000:80

    volumes:
      - ./frontend:/frontend
  
  phpmyadmin_srv:
    depends_on:
      - mysql_srv
    image: phpmyadmin/phpmyadmin
    container_name: phpadmin_ctr
    restart: always
    environment:
      PMA_HOST: ${DATABASE_HOST}
    ports:
      - 8080:80

volumes:
  database-volume:
```

# Dev

Disable CORS in browser

Install XAMPP

Run MySQL server and Apache server

`cd frontend`

`npm install`

`cd backend`

`npm install`

## Enviroment variables

Place .env in root folder

```
SECRET_KEY=[google_api_key]
VITE_GOOGLE_CLIENT_ID=[google_client_id]
MYSQL_USER=[user_name]
MYSQL_PASSWORD=[database_password]
MYSQL_DATABASE=[database_name]
DATABASE_HOST=localhost
CLIENT_ORIGIN=http://localhost:5173
```

NOTE: for dev user is "root", db name is "ekonomiappen_development" and password is empty.

## Backend server (inside backend)

`npm start`


## Frontend server (inside frontend)

`npm run dev`