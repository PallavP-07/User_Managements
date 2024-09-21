import { Router } from 'express';
import { assignClientToUser, updateUserDetails, updateClientDetails } from '../controllers/admin.controller.js';
import { isAdmin, verifyToken } from '../middlewares/auth.js';

const router = Router();

router.put('/user/:id/assign-client', verifyToken, isAdmin, assignClientToUser);
router.put('/user/:id', verifyToken, isAdmin, updateUserDetails);
router.put('/client/:id', verifyToken, isAdmin, updateClientDetails);

export default router;
