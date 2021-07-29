const { INTEGER, STRING } = require('sequelize');

const sequelize = require('../utils/database');

const Note = sequelize.define('notes', {
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
    note: {
        type: STRING
    }
}, {
    timestamps: false
});

module.exports = Note;