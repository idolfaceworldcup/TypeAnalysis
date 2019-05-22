const analysis = require('../db/query/analysis')
const pool = require('../db/pool')

exports.getAnalysis = async (req, res, next) => {
    let conn = await pool.getConnection()
    let result = await analysis.findAll()
    conn.release()

    res.send(result)
}