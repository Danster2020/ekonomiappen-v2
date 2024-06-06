import express from "express"
import { editUser, getUserById } from "../controllers/users.js"
import { authenticate } from "../controllers/auth.js"

const router = express.Router()

// router.get("/", getAllUsers)
router.get("/", authenticate, getUserById)
router.put("/", authenticate, editUser)

export default router