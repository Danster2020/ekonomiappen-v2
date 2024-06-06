import express from "express"
import { getItemPref, changeItemPref } from "../controllers/itemPref.js"
import { authenticate } from "../controllers/auth.js"

const router = express.Router()

router.get("/", authenticate, getItemPref)
router.put("/", authenticate, changeItemPref)

export default router