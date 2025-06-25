import express from "express"
import { getAllUsers, loginUser, registerUser } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"


const router = express.Router()

router.post('/register',
    upload.fields([
        {
            name: "profilePicture",
            maxCount: 1
        }
    ]),
    registerUser)
router.post('/login', loginUser)

router.use(isAuthenticated)

router.get('/', getAllUsers)

export default router