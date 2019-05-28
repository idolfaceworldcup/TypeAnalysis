const result = require('../db/query/result')
const pool = require('../db/pool')

exports.createResult = async (content, imageId, analysisId, accountId) => {
    try {
        let conn = await pool.getConnection()
        await result.insert(conn, content, imageId, analysisId, accountId)
        await conn.release()

        return 200
    } catch (err) {
        return 500
    }
}

exports.getResult = async (accountId) => {
    try {
        let conn = await pool.getConnection()
        let row = await result.findByAccountId(conn, accountId)
        await conn.release()

        return row
    } catch (err) {
        return 500
    }
}
