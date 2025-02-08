import express from 'express';
import { getUserProfile, loginUser, logoutUser, registerUser, updatePassword, updateProfile } from '../controllers/user.controller.js';
import AuthenticateUser from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Gemini 1.5 Flash API');
})

router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.post("/logout" , logoutUser)
router.get ('/profile', AuthenticateUser , getUserProfile )
router.put('/update', AuthenticateUser, updateProfile)
router.put('/change-password', AuthenticateUser, updatePassword)

export default router;