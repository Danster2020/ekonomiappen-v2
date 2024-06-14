import { db } from "../db.js";
import 'dotenv/config'
import { handleSQLError } from "./auth.js"

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
            return handleSQLError(err, res)
        }
        return res.json("Item created successfully.")
    })
}


// export const getAllUsers = (req, res) => {
//     const sql = "SELECT * FROM user";
//     db.query(sql, (err, data) => {
//         if (err) {
//             return res.json(err);
//         }
//         return res.json(data);
//     });
// }

export const getUserById = (req, res) => {
    const user_id = req.userInfo.user_id

    const sql = "SELECT id, date_created, name, income FROM user WHERE id = ?";
    db.query(sql, [user_id], (err, data) => {
        if (err) {
            return handleSQLError(err, res)
        }
        return res.json(data[0]);
    });
}

export const editUser = (req, res) => {
    const user_id = req.userInfo.user_id
    const sql = "UPDATE user SET income = ? WHERE id = ?"
    const values = [
        req.body.income,
    ]

    db.query(sql, [...values, user_id], (err, data) => {
        if (err) {
            return handleSQLError(err, res)
        }
        return res.json("user has been updated successfully.")
    })
}

