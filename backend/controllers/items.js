import { db } from "../db.js";
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const getAllItems = (req, res) => {

    const id = req.userInfo.user_id; // Extract user ID from request object

    console.log("DEBUG id", id);

    // const sql = `
    //     SELECT item.*
    //     FROM item
    //     JOIN user ON item.user_id = user.id
    //     WHERE user.google_id = ?;
    // `;

    const sql = `
    SELECT item.*
    FROM item
    WHERE item.user_id = ?
    `;

    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });

    // console.log("DEBUG request:", req.cookies);

    // Authentication
    // const token = req.cookies.access_token;
    // if (!token) {
    //     return res.status(401).json("Not authenticated!");
    // }

    // const secretKey = process.env.SECRET_KEY;

    // jwt.verify(token, secretKey, (err, userInfo) => {
    //     if (err) {
    //         return res.status(403).json("Token is not valid!");
    //     }
    //     console.log("DEBUG TOKEN:", userInfo);

    //     const id = userInfo.sub
    //     const sql = `
    //     SELECT item.*
    //     FROM item
    //     JOIN user ON item.user_id = user.id
    //     WHERE user.google_id = ?;
    //     `;

    //     db.query(sql, [id], (err, data) => {
    //         if (err) {
    //             return res.json(err);
    //         }
    //         return res.json(data);
    //     });
    // });
}

export const getItemById = (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM item WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
}

export const addItem = (req, res) => {

    const id = req.userInfo.user_id; // Extract user ID from request object

    const sql = "INSERT INTO item (`title`, user_id, price, description) VALUES (?)"
    const values = [
        req.body.title,
        id,
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

export const deleteItem = (req, res) => {

    const id = req.userInfo.user_id; // Extract user ID from request object

    const item_id = req.params.id;
    const sql = "DELETE FROM item WHERE id = ? AND user_id = ?";

    db.query(sql, [item_id, id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json("Item has been deleted successfully.");
    });
};


export const updateItem = (req, res) => {

    const id = req.userInfo.user_id; // Extract user ID from request object

    const item_id = req.params.id
    const sql = "UPDATE item SET `title` = ?, price = ?, description = ? WHERE id = ? AND user_id = ?"
    const values = [
        req.body.title,
        req.body.price,
        req.body.description,
    ]

    db.query(sql, [...values, item_id, id], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("Item has been updated successfully.")
    })
}


// app.post("/items", (req, res) => {
//     const sql = "INSERT INTO item (`name`, user_id, price, description) VALUES (?)"
//     const values = [
//         req.body.name,
//         req.body.user_id,
//         req.body.price,
//         req.body.description,
//     ]

//     db.query(sql, [values], (err, data) => {
//         if (err) {
//             return res.json(err)
//         }
//         return res.json("Item created successfully.")
//     })
// })

// app.delete("/items/:id", (req, res) => {
//     const id = req.params.id
//     const sql = "DELETE FROM item WHERE id = ?"

//     db.query(sql, [id], (err, data) => {
//         if (err) {
//             return res.json(err)
//         }
//         return res.json("Item has been deleted successfully.")
//     })
// })

// app.put("/items/:id", (req, res) => {
//     const id = req.params.id
//     const sql = "UPDATE item SET `name` = ?, price = ?, description = ? WHERE id = ?"
//     const values = [
//         req.body.id,
//         req.body.name,
//         req.body.price,
//         req.body.description,
//     ]

//     db.query(sql, [...values, id], (err, data) => {
//         if (err) {
//             return res.json(err)
//         }
//         return res.json("Item has been updated successfully.")
//     })
// })