const attribute = require('../db/query/attribute')
const pool = require('../db/pool')

exports.getAttribute = async (analysisId) => {
    let conn = await pool.getConnection()
    let result = await attribute.findByAnalysisId(conn, analysisId)
    await conn.release()

    return result
}