# Notes

Make sure that CLIENT_ORIGIN is in Authorized redirect URIs in Google Cloud.

# Production

Run docker-compose file.

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
HOST_PORT_MYSQL=14165
HOST_PORT_BACKEND=53848
HOST_PORT_FRONTEND=3000
HOST_PORT_PHPMYADMIN=32613
```

NOTE: for dev user is "root", db name is "ekonomiappen_development" and password is empty.

## Backend server (inside backend)

`npm run dev`


## Frontend server (inside frontend)

`npm run dev`