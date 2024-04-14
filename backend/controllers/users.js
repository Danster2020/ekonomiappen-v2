import { db } from "../db.js";

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
    const id = req.params.id
    const sql = "SELECT * FROM user WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data[0]);
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