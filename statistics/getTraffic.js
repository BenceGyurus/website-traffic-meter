const Traffic = require("../Schemas/Traffic.schema")

/*
@param {object} req
@param {object} res
@param {function} next
@return {void}
@description This function is used to get the traffic
*/
const getTraffic = async (req, res, next) => {
  try {
      const { start, end } = req.query;

      const endDate = end ? new Date(end) : new Date();
      const startDate = start ? new Date(start) : new Date(endDate.getTime() - 24 * 60 * 60 * 1000);

      if (isNaN(startDate) || isNaN(endDate)) {
          return res.status(400).send({ error: "Invalid date format." });
      }

      const trafficData = await Traffic.aggregate([
          {
              $match: {
                  timestamp: {
                      $gte: startDate,
                      $lte: endDate
                  }
              }
          },
          {
              $group: {
                  _id: "$sessionId",
              },
          },
          {
              $count: "traffic",
          },
      ]);

      return res.send(trafficData[0] || { traffic: 0 });
  } catch (error) {
      next(error);
  }
};



module.exports = getTraffic;