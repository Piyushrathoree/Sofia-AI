import express from 'express';
import { assistant } from '../controllers/chat.controller.js';
import AuthenticateUser from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/' , AuthenticateUser , assistant)


export default router;