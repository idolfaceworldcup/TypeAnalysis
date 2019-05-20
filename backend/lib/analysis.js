const analysis = require('../db/query/analysis')

exports.getAnalysis = async (req, res, next) => {
    res.send(await analysis.findAll())
}