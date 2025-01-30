import express from 'express';
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import AuthenticateUser from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Gemini 1.5 Flash API');
})

router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.post("/logout" , logoutUser)
router.get ('/profile', AuthenticateUser , getUserProfile )

export default router;