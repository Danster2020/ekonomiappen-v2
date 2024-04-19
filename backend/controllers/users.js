import { db } from "../db.js";
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const createUser = (req, res) => {
    const sql = "INSERT INTO user google_id = ?, name = ?"
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
}


export const getAllUsers = (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
}

export const getUserById = (req, res) => {

    console.log("DEBUG request:", req.cookies);

    // Authentication
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("Not authenticated!");
    }

    const secretKey = process.env.SECRET_KEY;

    jwt.verify(token, secretKey, (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }
        console.log("DEBUG TOKEN:", userInfo);

        // const id = req.params.id
        const google_id = userInfo.sub
        const sql = "SELECT * FROM user WHERE google_id = ?";
        db.query(sql, [google_id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data[0]);
        });
    });



}

export const editUser = (req, res) => {
    const id = req.params.id
    const sql = "UPDATE user SET income = ? WHERE id = ?"
    const values = [
        req.body.income,
    ]

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("user has been updated successfully.")
    })
}

