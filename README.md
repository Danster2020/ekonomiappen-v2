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
      - MYSQL_ROOT_PASSWORD=$MYSQL_PASSWORD
      - MYSQL_DATABASE=$MYSQL_DATABASE
    ports:
      - "3307:3306"
    volumes:
      - ./data:/var/lib/mysql
      - ./conf:/etc/mysql/conf.d
      - ./logs:/logs

  backend_srv:
    build: 
      context: ./backend
    depends_on:
      - mysql_srv
    environment:
      MYSQL_USER: root
      MYSQL_PASSWORD:
      MYSQL_DATABASE: ekonomiappen_development
    ports:
      - 8081:8081
    volumes:
      - ./backend:/backend

  frontend_srv:
    build: 
      context: ./frontend
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
      PMA_HOST: mysql_srv
    ports:
      - 8080:80

volumes:
  mysql_srv:
    driver: local
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

Place .env inside backend

```
SECRET_KEY=[google api key]
MYSQL_USER=[user name]
MYSQL_PASSWORD=[database password]
MYSQL_DATABASE=[database name]
```

NOTE: for dev user is "root", db name is "ekonomiappen_development" and password is empty.

## Backend server (inside backend)

`npm start`


## Frontend server (inside frontend)

`npm run dev`