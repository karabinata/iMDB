const express = require('express');

const { authMiddleware, requireSignin } = require('../controllers/auth');
const { create, fetchUserMovieNote, updateNote } = require('../controllers/notes');

const router = express.Router();

router.get('/api/notes/:movieId', authMiddleware, requireSignin, fetchUserMovieNote);

router.put('/api/notes/:noteId', authMiddleware, requireSignin, updateNote);

router.post('/api/notes', authMiddleware, requireSignin, create);

module.exports = router;