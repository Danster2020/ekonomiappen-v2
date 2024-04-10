const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ekonomiappen_dev"
})

app.get("/", (re, res) => {
    return res.json("From Backend")
})

app.get("/users", (req, res) => {
    const sql = "SELECT * FROM user"
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

// ITEMS

app.get("/items", (req, res) => {
    const sql = "SELECT * FROM item"
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

app.post("/items", (req, res) => {
    const sql = "INSERT INTO item (`name`, user_id, price, description) VALUES (?)"
    const values = [
        req.body.name,
        req.body.user_id,
        req.body.price,
        req.body.description,
    ]

    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("Item created successfully.")
    })
})

app.delete("/items/:user_id/:name", (req, res) => {
    const user_id = req.params.user_id
    const name = req.params.name
    const sql = "DELETE FROM item WHERE user_id = ? AND name = ?"

    db.query(sql, [user_id, name], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("Item has been deleted successfully.")
    })
})

app.listen(8081, () => {
    console.log("Listening...")
})