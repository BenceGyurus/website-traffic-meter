const Traffic = require("../Schemas/Traffic.schema")

/*
@param {object} req
@param {object} res
@param {function} next
@return {void}
@description This function is used to get the traffic
*/
const getTraffic = async (req,res,next)=>{
    return res.send((await Traffic.aggregate([
        {
          $group: {
            _id: "$sessionId",
          },
        },
        {
          $count: "traffic",
        },
      ]))[0]);  
}

module.exports = getTraffic;