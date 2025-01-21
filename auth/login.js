const User = require('../Schemas/User.Schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
    POST /api/auth/login
    @param {object} req
    @param {object} res
    @return {void}
    @description This function is used to login a user. body {username : <username>, password : <password>}
*/
const login = async (req,res)=>{
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
        });
        res.status(200).json({ token });
        } catch (error) {
        res.status(500).json({ error: 'Login failed' });
        }
}

module.exports = login;