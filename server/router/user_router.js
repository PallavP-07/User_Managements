import { Router } from 'express';
import { getUserById } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/auth.js';

const router = Router();

router.get('/user/:id', verifyToken, getUserById);

export default router;
