// routes/setup.js
const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');
const User = require('../models/user');
const Task = require('../models/task');
const { execSync } = require('child_process');
const path = require('path');
// Route to create tables
router.post('/create-tables', async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync all models to the database
    execSync('npx sequelize-cli db:migrate', { stdio: 'inherit', cwd: path.resolve(__dirname, '../') });
    console.log('Tables have been created.');

    res.status(200).json({ message: 'Tables created successfully' });
  } catch (error) {
    console.error('Unable to create tables:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;