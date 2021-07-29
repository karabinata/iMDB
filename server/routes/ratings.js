const express = require('express');

const { authMiddleware, requireSignin } = require('../controllers/auth');
const { create, fetchUserMovieRating, updateRating } = require('../controllers/ratings');

const router = express.Router();

router.get('/api/ratings/:movieId', authMiddleware, requireSignin, fetchUserMovieRating);

router.put('/api/ratings/:ratingId', authMiddleware, requireSignin, updateRating);

router.post('/api/ratings', authMiddleware, requireSignin, create);

module.exports = router;