const { FLOAT, INTEGER } = require('sequelize');

const sequelize = require('../utils/database');

const Rating = sequelize.define('ratings', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    movieId: {
        type: INTEGER,
        allowNull: false
    },
    rating: {
        type: FLOAT
    }
}, {
    timestamps: false
});

module.exports = Rating;