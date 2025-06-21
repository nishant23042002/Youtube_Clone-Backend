import express from "express"
import { getAllUsers, loginUser, registerUser } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get('/',isAuthenticated, getAllUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)


export default router