const image = require('../db/query/image')
const pool = require('../db/pool')

exports.getImage = async (analysisId) => {
    let conn = await pool.getConnection()
    let result = await image.findByAnalysisId(conn, analysisId)
    await conn.release()

    return result
}

exports.getTwoImage = async (analysisId, id1, id2) => {
    let conn = await pool.getConnection()
    let result = await image.findByAnalysisIdAndIds(conn, analysisId, id1, id2)
    await conn.release()

    return result
}