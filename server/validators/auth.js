const { check } = require('express-validator');

exports.userAuth = [
    check('email').isEmail().withMessage('Email is required.'),
    check('password').isLength({ min: 6 }).withMessage('Password length should be at least 6 characters.')
];