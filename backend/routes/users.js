import express from "express"
import { getAllUsers, editUser, getUserById } from "../controllers/users.js"

const router = express.Router()

router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.put("/:id", editUser)

export default router