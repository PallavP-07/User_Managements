import { Router } from 'express';
import { check } from 'express-validator';
import { registerUser, registerClient } from '../controllers/auth_controller.js';

const router = Router();

router.post(
  '/register/user',
  [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long'),
  ],
  registerUser
);

router.post(
  '/register/client',
  [
    check('name').not().isEmpty().withMessage('Client name is required'),
    check('contact').not().isEmpty().withMessage('Contact info is required'),
  ],
  registerClient
);

export default router;
