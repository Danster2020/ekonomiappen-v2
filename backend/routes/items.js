import express from "express"
import { getAllItems, getItemById, addItem, deleteItem, updateItem, authenticate } from "../controllers/items.js"

const router = express.Router()

router.get("/", authenticate, getAllItems)
router.post("/add", authenticate, addItem)
router.put("/:id", authenticate, updateItem)
router.delete("/:id", authenticate, deleteItem)
router.get("/:id", authenticate, getItemById)

export default router