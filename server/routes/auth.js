const express = require('express');

const { signup, signin, signout } = require('../controllers/auth');
const { runValidation } = require('../validators');
const { userAuth } = require('../validators/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *          password
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 */

/**
 * @swagger
 * /api/signup:
 *  post:
 *    description: Sign up new users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *       201:
 *         description: User signed up
 */

router.post('/api/signup', userAuth, runValidation, signup);

/**
 * @swagger
 * /api/signin:
 *  post:
 *    description: Sign in users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *       201:
 *         description: User signed in
 */

router.post('/api/signin', userAuth, runValidation, signin);
router.get('/api/signout', signout);

module.exports = router;