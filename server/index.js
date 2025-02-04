const express = require("express");
const app =express();
const cors=require("cors");

app.use(express.json());

app.use(cors());

const db = require("./models");

//Routers
const postRouter=require("./routes/Posts");
const CommentsRouter=require("./routes/Comments");
app.use("/posts",postRouter);
app.use("/comments",CommentsRouter);

db.sequelize.sync().then(()=>{
app.listen(3001,() =>{
    console.log("Sever running on port 3001");
});
});



const { Sequelize } = require('sequelize');
const config = require('./config/config.json'); // Adjust the path to your config file
require('dotenv').config(); // Load environment variables from .env file

// Determine the environment
const env = process.env.NODE_ENV || 'development';

// Load the configuration based on the environment
const dbConfig = {
  ...config[env],
  username: process.env.DB_USER || config[env].username,
  password: process.env.DB_PASSWORD || config[env].password,
  database: process.env.DB_NAME || config[env].database,
  host: process.env.DB_HOST || config[env].host,
  dialect: config[env].dialect,
};

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

module.exports = sequelize;

