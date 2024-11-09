import { db } from "../db.js";
import 'dotenv/config'
import { handleError } from "../helperFunctions.js"


export const getAllItems = (req, res) => {
    const user_id = req.userInfo.user_id;
    const sql = `
    SELECT item.*
    FROM item
    WHERE item.user_id = ?
    `;

    db.query(sql, [user_id], (err, data) => {
        if (err) {
            return handleError(err, res)
        }
        return res.json(data);
    });
}

export const getItemById = (req, res) => {
    const user_id = req.userInfo.user_id;
    const sql = "SELECT * FROM item WHERE id = ?";
    db.query(sql, [user_id], (err, data) => {
        if (err) {
            return handleError(err, res)
        }
        return res.json(data);
    });
}

export const addItem = (req, res) => {
    const user_id = req.userInfo.user_id;
    const sql = "INSERT INTO item (`title`, user_id, price, description, icon) VALUES (?)"
    const values = [
        req.body.title,
        user_id,
        req.body.price,
        req.body.description,
        icon,
    ]

    db.query(sql, [values], (err, data) => {
        if (err) {
            return handleError(err, res)
        }
        return res.json("Item created successfully.")
    })
}

export const deleteItem = (req, res) => {
    const user_id = req.userInfo.user_id;
    const item_id = req.params.id;
    const sql = "DELETE FROM item WHERE id = ? AND user_id = ?";

    db.query(sql, [item_id, user_id], (err, data) => {
        if (err) {
            return handleError(err, res)
        }
        return res.json("Item has been deleted successfully.");
    });
};


export const updateItem = (req, res) => {
    const user_id = req.userInfo.user_id;
    const item_id = req.params.id
    const sql = "UPDATE item SET `title` = ?, price = ?, description = ?, icon = ? WHERE id = ? AND user_id = ?"
    const values = [
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.icon,
    ]

    db.query(sql, [...values, item_id, user_id], (err, data) => {
        if (err) {
            return handleError(err, res)
        }
        return res.json("Item has been updated successfully.")
    })
}
