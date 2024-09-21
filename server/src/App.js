import express from 'express';
import cors from 'cors'
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import sequelize from '../config/db.js'
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import userRoutes from './routes/user.routes.js';
const app =express()

app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('server working fine!')
})
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});
const io = new Server(httpServer);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('User connected', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});
sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });
export default app