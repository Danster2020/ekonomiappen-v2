import { db } from "../db.js";

export const getItemPref = (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM item_preference WHERE user_id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data[0]);
    });
}

export const changeItemPref = (req, res) => {
    const id = req.params.id
    const sql = "UPDATE item_preference SET sort_by = ? WHERE user_id = ?"
    const values = [
        req.body.sort_by,
        req.params.id,
    ]

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            return res.json(err)
        }
        console.log("sql succeded: ");
        console.log(data);
        console.log("Generated SQL query:", sql, "with values:", values);

        return res.json("item preference has been updated successfully.")
    })
}