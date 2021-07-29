const { INTEGER, STRING } = require('sequelize');

const sequelize = require('../utils/database');

const Favorite = sequelize.define('favorites', {
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
    title: {
        type: STRING(100),
        allowNull: false
    },
    summary: {
        type: STRING(700)
    },
    premiered: {
        type: STRING(10)
    },
    genres: {
        type: STRING
    },
    image: {
        type: STRING
    },
    runtime: {
        type: INTEGER
    },
    officialSite: {
        type: STRING
    }
}, {
    timestamps: false
});

module.exports = Favorite;