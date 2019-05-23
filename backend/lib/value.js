const value = require('../db/query/value')
const pool = require('../db/pool')

exports.getValue = async (imageId) => {
    let conn = await pool.getConnection()
    let result = await value.findByImageId(conn, imageId)
    await conn.release()

    return result
}