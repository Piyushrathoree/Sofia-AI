import express from 'express';
import { assistant } from '../controllers/chat.controller.js';
const router = express.Router();

router.post('/chat' , assistant)

export default router;