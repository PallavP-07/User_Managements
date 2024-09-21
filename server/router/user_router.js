import { Router } from 'express';
import { getUserById } from '../controllers/user_controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/user/:id', verifyToken, getUserById);

export default router;
