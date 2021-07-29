const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const PasswordManager = require('../utils/password');
const User = require('../models/user');

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email} });

        if (existingUser) {
            return res.status(200).send({ error: 'Email already in use.' });
        }

        const hashedPassword = await PasswordManager.toHash(password);

        const user = User.build({ email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        return res.json({ token, user: { email, id: user.id } });
    } catch (error) {
        return res.status(400).send({ error });
    }
}

exports.signin = async (req, res) => {
    const { email, password} = req.body;
  
    try {
        const existingUser = await User.findOne({ where: { email }});
        if (!existingUser) {
            throw 'Invalid email or password';
        }

        const passwordsMatch = await PasswordManager.compare(existingUser.dataValues.password, password);
        if (!passwordsMatch) {
            throw 'Invalid email or password';
        }

        const token = jwt.sign({
            id: existingUser.id
        }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        return res.json({ token, user: { email, id: existingUser.id } });
    } catch (error) {
        res.status(400).send({ error });
    }
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    return res.json({ message: 'Signed out.' })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty: "auth"
});

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256']
        });

        const userId = user && user.id;
        if (!userId) {
            return res.status(200).json({ error: 'Моля влезте в профила си' });
        }
        const existingUser = await User.findOne({ where: { id: userId } });

        if (!existingUser) {
            return res.status(200).json({ error: 'Моля влезте в профила си' });
        }

        req.profile = existingUser;
    } catch (error) {
        return res.status(200).json({ error: 'Моля влезте в профила си' });
    }
    next();
}


