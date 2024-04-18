import express from "express"
import { login, logout } from "../controllers/auth.js"
import cors from "cors";

const router = express.Router()

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

// router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

export default router