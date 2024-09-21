import { Router } from 'express';
import { assignClientToUser, updateUserDetails, updateClientDetails } from '../controllers/admin_controller.js';
import { isAdmin, verifyToken } from '../middleware/auth.js';

const router = Router();

router.put('/user/:id/assign-client', verifyToken, isAdmin, assignClientToUser);
router.put('/user/:id', verifyToken, isAdmin, updateUserDetails);
router.put('/client/:id', verifyToken, isAdmin, updateClientDetails);

export default router;
