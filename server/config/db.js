import { Sequelize, DataTypes } from "sequelize";
import UserModel from '../model/User_Model.js';
import ClientModel from '../model/Client_Modle.js'; // Fixed typo in the file name
import dotenv from 'dotenv';

dotenv.config({ path: './.env' }); // Load environment variables

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT || 5432,  // Use default PostgreSQL port if not provided
    logging: false,  // Disable SQL query logging
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Initialize models
const db = {
  sequelize,  // Store the Sequelize instance
  Sequelize,  // Sequelize library for use elsewhere
  user: UserModel(sequelize, DataTypes),  // Initialize UserModel
  client: ClientModel(sequelize, DataTypes),  // Initialize ClientModel
};

// Synchronize models with the database
sequelize.sync()  // Call sync on the sequelize instance, not db
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

export default db;
