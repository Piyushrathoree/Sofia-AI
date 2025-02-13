import express from 'express';
import { assistant, getChatHistory } from '../controllers/chat.controller.js';
import AuthenticateUser from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/Ai' , AuthenticateUser , assistant)
router.get('/history', AuthenticateUser, getChatHistory)


export default router;