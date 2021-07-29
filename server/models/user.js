const { INTEGER, STRING } = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: STRING(100),
        allowNull: false,
        allowNull: false,
        unique: true
    },
    password: {
        type: STRING(255),
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = User;