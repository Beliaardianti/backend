const { Sequelize } = require('sequelize');
require('dotenv').config(); 


const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, 
  }
);


sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
