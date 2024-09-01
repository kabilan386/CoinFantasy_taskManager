const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_manage', 'root', 'password', {
  host: 'mysql',
  dialect: 'mysql',
  port: 3306 // Optional, default is 3306
});

module.exports = sequelize;