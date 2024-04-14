import express from "express"
import { getItemPref, changeItemPref } from "../controllers/itemPref.js"

const router = express.Router()

router.get("/:id", getItemPref)
router.put("/:id", changeItemPref)

export default router