const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(scrypt);

exports.toHash = async (password) => {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scryptAsync(password, salt, 64));

    return `${buffer.toString('hex')}.${salt}`;
}

exports.compare = async (storedPassword, suppliedPassword) => {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buffer = (await scryptAsync(suppliedPassword, salt, 64));

    return buffer.toString('hex') === hashedPassword;
}