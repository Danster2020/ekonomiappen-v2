import { db } from "../db.js";


export const getAllItems = (req, res) => {
    const sql = "SELECT * FROM item";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
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
    const sql = "INSERT INTO item (`title`, user_id, price, description) VALUES (?)"
    const values = [
        req.body.title,
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

export const deleteItem = (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM item WHERE id = ?"

    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json("Item has been deleted successfully.")
    })
}

export const updateItem = (req, res) => {
    const id = req.params.id
    const sql = "UPDATE item SET `title` = ?, price = ?, description = ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.price,
        req.body.description,
    ]

    db.query(sql, [...values, id], (err, data) => {
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