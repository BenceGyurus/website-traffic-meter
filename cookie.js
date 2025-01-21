const { v4: uuidv4 } = require('uuid');
const Traffic = require('./Schemas/Traffic.schema');

/*
@param {object} req
@param {object} res
@param {function} next
@return {void}
@description This middleware function is used to create a cookie if it does not exist and log the traffic
*/
const CookieMiddleware = async (req,res,next)=>{
    const cookie = req.cookies.sessionId;
    if (cookie){
        await Traffic.create({sessionId: cookie, time: Date.now(), url : req.query.url});
    }
    else{
        let sessionId = uuidv4();
        res.cookie('sessionId', sessionId, { maxAge: 7200000, httpOnly: true })
        await Traffic.create({sessionId: sessionId, time: Date.now(), url : req.query.url});
    }
    return next();
};

module.exports = CookieMiddleware;