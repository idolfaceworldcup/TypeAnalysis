const attribute = require('../db/query/attribute')
const value = require('../db/query/value')
const pool = require('../db/pool')

exports.getAttribute = async (analysisId) => {
    try {
        let conn = await pool.getConnection()
        let result = await attribute.findByAnalysisId(conn, analysisId)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

exports.addAttribute = async (name, analysisId) => {
    try {
        let conn = await pool.getConnection()
        await attribute.insert(conn, name, analysisId)
        await conn.release()

        return 200
    } catch (err) {
        return 500
    }
}

exports.deleteAttribute = async (attributeId) => {
    try {
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try {
            await value.deleteByAttributeId(conn, attributeId)
            await attribute.delete(conn, attributeId)
        } catch(err) {
                await conn.rollback();
                await conn.release();
                return 500
        }
        await conn.commit()
        await conn.release()
    } catch(err) {
        return 500
    }

    return 200
}