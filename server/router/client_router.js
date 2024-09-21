import { Router } from 'express';
import { getClientById, updateClientDetails, assignUserToClient } from '../controllers/client_controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = Router();

// Get client by ID
router.get('/client/:id', verifyToken, isAdmin, getClientById);

// Update client details
router.put('/client/:id', verifyToken, isAdmin, updateClientDetails);

// Assign user to client
router.put('/client/:id/assign-user', verifyToken, isAdmin, assignUserToClient);

export default router;
