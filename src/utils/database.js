const { Sequelize, Model, DataTypes, json } = require('sequelize');
require('dotenv').config();
const {DB_NAME, DB_USER,DB_PWRD,DB_HOST} = require('./constants');
// Option 2: Passing parameters separately (other dialects)

console.log(`Database name ${DB_NAME}\n Database User ${DB_USER}\n Database Password ${DB_PWRD}\n Database host ${DB_HOST}`);
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWRD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  timestamps: false/* one of 'mysql |  | 'postgres' | 'mssql' */
//   logging:true
});
//const db = new Sequelize(process.env.CONNECTION_STRING);
db.authenticate()
.then(()=>{console.log('Connection has been established successfully.');})
.catch(error=>{console.error('Unable to connect to the database:', error)});

module.exports = db;