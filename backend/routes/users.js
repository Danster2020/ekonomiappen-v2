import express from "express"
import { getAllUsers, getItemPref, changeItemPref } from "../controllers/users.js"

const router = express.Router()

router.get("/", getAllUsers)
router.get("/:id", getItemPref)
router.put("/:id", changeItemPref)

export default router