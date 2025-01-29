import express from 'express';
import { assistant } from '../controllers/chat.controller.js';
const router = express.Router();

router.post('/' , assistant)

export default router;