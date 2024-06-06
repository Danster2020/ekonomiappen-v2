import { db } from "../db.js";

export const getItemPref = (req, res) => {
    const user_id = req.userInfo.user_id
    const sql = "SELECT * FROM item_preference WHERE user_id = ?";
    db.query(sql, [user_id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data[0]);
    });
}

export const changeItemPref = (req, res) => {
    const user_id = req.userInfo.user_id
    const sql = "UPDATE item_preference SET sort_by = ? WHERE user_id = ?"
    const values = [
        req.body.sort_by,
    ]

    db.query(sql, [...values, user_id], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("item preference has been updated successfully.")
    })
}