import express from 'express';
import cors from 'cors'
import sequelize from '../config/db.js'
const app =express()

app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('server working fine!')
})

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });
export default app