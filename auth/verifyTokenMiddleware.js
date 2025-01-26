const jwt = require('jsonwebtoken');
const Functions = require('../functions');
const { default: axios } = require('axios');
const verifyToken =(req, res, next)=>{
    const token = req.header('Authorization');
    let config = Functions.openConfig();
    axios.get(`${config.authUrl}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        }).then(response=>{
        if (response.data && response.status === 200 && response.data.isAdmin){
            next();
        }else{
            res.status(401).send({status: 'error', message: 'Unauthorized'});
        }
        }).catch(error=>{
            res.status(500).send({status: 'error', message: 'Internal server error'});
        });
 };

module.exports = verifyToken;