const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bparcum4vaubczrh7wcm', 'u9zc6gse2on73nrq', '5trqpukHjhkjRiouuCR0', {
  host: 'bparcum4vaubczrh7wcm-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  port: 3306 // Optional, default is 3306
});

module.exports = sequelize;