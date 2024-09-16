// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

import mysql from "mysql2"
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const db_host = process.env.DATABASE_HOST;
const db_user = process.env.MYSQL_USER;
const db_password = process.env.MYSQL_PASSWORD;
const db_name = process.env.MYSQL_DATABASE;

if (db_user == undefined || db_password == undefined || db_name == undefined) {
    console.error("Enviroment variables failed to load!");
} else {
    console.log("Enviroment variables loaded successfully.");
}

export const db = mysql.createPool({
    host: db_host, // localhost for dev, mysql_srv for docker
    user: db_user,
    password: db_password,
    database: db_name,
    supportBigNumbers: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

// Check if the connection was successful
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
    connection.release();
});

// Handle MySQL connection errors
db.on('error', function (err) {
    console.error('MySQL database error:', err);
});