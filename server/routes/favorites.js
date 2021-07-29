const express = require('express');

const { authMiddleware, requireSignin } = require('../controllers/auth');
const { create, fetchUserFavorites, removeFromFavorites } = require('../controllers/favorites');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Movie:
 *      type: object
 *      required:
 *        - movieId
 *          title
 *      properties:
 *        movieId:
 *          type: integer
 *        title:
 *          type: string
 *        summary:
 *          type: string
 *        premiered:
 *          type: string
 *        genres:
 *          type: string
 *        image:
 *          type: string
 *        runtime:
 *          type: integer
 *        officialSite:
 *          type: string
 */

/**
* @swagger
* components:
*  schemas:
*    AddedMovie:
*      type: object
*      properties:
*        id:
*          type: integer
*        message:
*          type: string
*/

/**
 * @swagger
 * /api/favorites:
 *  get:
 *    summary: Returns the list of user favorites
 *    responses:
 *      200:
 *        description: The list of the movies
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Movie'
 */

router.get('/api/favorites', authMiddleware, requireSignin, fetchUserFavorites);

/**
 * @swagger
 * /api/favorites:
 *  post:
 *    summary: Adds movie to user favorites
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    responses:
 *      201:
 *        description: Id of added movie
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/AddedMovie'
 */

router.post('/api/favorites', authMiddleware, requireSignin, create);

/**
 * @swagger
 * /api/favorites/:favId:
 *  delete:
 *    summary: Deletes movie from user favorites
 *    parameters:
 *      - in: path
 *        name: favId
 *        schema:
 *          type: number
 *        required: true
 *        description: Favorite id
 *    responses:
 *      200:
 *        description: Deleted from favorites
 */

router.delete('/api/favorites/:favId', authMiddleware, requireSignin, removeFromFavorites);

module.exports = router;