const User = require('../Schemas/User.Schema');
const bcrypt = require('bcrypt');

/*
POST /api/auth/registration
@param {object} req
@param {object} res
@return {void}
@description This function is used to register a user. body {username : <username>, password : <password>}
*/
const registration = async (req, res) => {
        try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
        }
        };

module.exports = registration;