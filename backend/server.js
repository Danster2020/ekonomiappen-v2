import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors";

// Routes
import itemsRoutes from "./routes/items.js"
import usersRoutes from "./routes/users.js"
import itemPrefRoutes from "./routes/itemPref.js"
import authRoutes from "./routes/auth.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))

app.use("/api/items", itemsRoutes) // items
app.use("/api/users", usersRoutes) // users
app.use("/api/item_pref", itemPrefRoutes) // item_pref
app.use("/api/auth", authRoutes) // users

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

// get all items
// app.get("/items", (req, res) => {
//     const sql = "SELECT * FROM item";
//     db.query(sql, (err, data) => {
//         if (err) {
//             return res.json(err);
//         }
//         return res.json(data);
//     });
// });

// get specific item
// app.get("/items/:id", (req, res) => {
//     const id = req.params.id
//     const sql = "SELECT * FROM item WHERE id = ?";
//     db.query(sql, [id], (err, data) => {
//         if (err) {
//             return res.json(err);
//         }
//         return res.json(data);
//     });
// });

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


// start server
const port = 8081;
app.listen(port, () => {
    console.log("Sever Listening on port: " + port + "...")
})