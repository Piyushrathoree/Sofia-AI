import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Gemini 1.5 Flash API');
})

router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.post("/logout" , logoutUser)

export default router;