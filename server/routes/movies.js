const express = require('express');
const { searchMovies, getMovie } = require('../controllers/movies');

const router = express.Router();

/**
 * @swagger
 * /api/movies/{name}:
 *  get:
 *    summary: Returns the list of movies
 *    parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: String movie name
 *    responses:
 *       200:
 *         description: The list of the movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */

router.get('/api/movies/:name', searchMovies);

router.get('/api/movies/show/:movieid', getMovie);

module.exports = router;