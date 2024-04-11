import express from "express"
import { getAllItems, getItemById, addItem, deleteItem, updateItem } from "../controllers/items.js"


const router = express.Router()

router.get("/", getAllItems)
router.post("/add", addItem)
router.put("/:id", updateItem)
router.delete("/:id", deleteItem)
router.get("/:id", getItemById)

export default router