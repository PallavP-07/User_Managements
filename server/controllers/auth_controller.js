import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import db from '../config/db.js';
import { generateToken } from '../services/jwt.js';

const User = db.user;
const Client = db.client;

// User registration
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    const token = generateToken(newUser);
    return res.status(201).json({ message: 'User registered', token, user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Client registration
export const registerClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, industry, contact } = req.body;
  try {
    const newClient = await Client.create({ name, industry, contact });
    return res.status(201).json({ message: 'Client registered', client: newClient });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering client', error: error.message });
  }
};
