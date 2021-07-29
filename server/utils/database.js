const Sequelize = require('sequelize');

const sequelize = new Sequelize('iMDB', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

module.exports = sequelize;