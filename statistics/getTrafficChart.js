const Traffic = require("../Schemas/Traffic.schema")

/*
@param {object} req
@param {object} res
@param {function} next
@return {void}
@description This function is used to get the traffic
*/
const getTrafficStats = async (req, res, next) => {
    try {
        const { start, end, intervals = 10 } = req.query;
        const endDate = end ? new Date(end) : new Date();
        const startDate = start ? new Date(start) : new Date(endDate.getTime() - 24 * 60 * 60 * 1000);

        if (isNaN(startDate) || isNaN(endDate)) {
            return res.status(400).send({ error: "Invalid date format." });
        }

        if (intervals <= 0) {
            return res.status(400).send({ error: "Intervals must be greater than 0." });
        }

        const intervalDuration = (endDate - startDate) / intervals;
        const trafficData = await Traffic.aggregate([
            {
                $match: {
                    time: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $project: {
                    sessionId: 1,
                    interval: {
                        $floor: {
                            $divide: [
                                { $subtract: ["$time", startDate] },
                                intervalDuration
                            ]
                        }
                    }
                }
            },
            {
                $group: {
                    _id: { interval: "$interval", sessionId: "$sessionId" },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.interval",
                    uniqueSessions: { $sum: 1 },
                    totalRequests: { $sum: "$count" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const stats = Array.from({ length: intervals }, (_, i) => ({
            interval: i,
            uniqueSessions: 0,
            totalRequests: 0
        }));

        trafficData.forEach(({ _id, uniqueSessions, totalRequests }) => {
            stats[_id] = { interval: _id, uniqueSessions, totalRequests };
        });

        return res.send(stats);
    } catch (error) {
        next(error); // Pass error to the error-handling middleware
    }
};


module.exports = getTrafficStats;