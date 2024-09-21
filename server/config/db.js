import { Sequelize,DataTypes  } from "sequelize";
import UserModel from '../model/User_Model.js';
import ClientModel from '../model/Client_Modle.js';
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});
// Use environment variables for sensitive data
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT || 5432,  // Use the default PostgreSQL port if not provided
  logging: false,
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  const db = {
    sequelize,
    Sequelize,
    user: UserModel(sequelize, DataTypes),
    client: ClientModel(sequelize, DataTypes),
  };
  db.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });
export default db;