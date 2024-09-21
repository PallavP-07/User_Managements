import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';  // Import the http module
import bodyParser from 'body-parser';

import authRoutes from '../router/auth_router.js';
import adminRoutes from '../router/admin_router.js';
import userRoutes from '../router/user_router.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Simple route to check server status
app.get('/', (req, res) => {
  res.send('Server working fine!');
});

// Create HTTP server by wrapping the express app
const httpServer = http.createServer(app);

// Initialize Socket.IO server on top of httpServer
const io = new Server(httpServer, {
  cors: {
    origin: '*',  // Allow all origins, you can restrict as needed
    methods: ['GET', 'POST'],
  },
});

// Attach Socket.IO instance to every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  // Handle socket disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

// Export httpServer to start it in another file
export default httpServer;
