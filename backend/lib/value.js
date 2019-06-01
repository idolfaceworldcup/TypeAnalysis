const value = require('../db/query/value')
const pool = require('../db/pool')

exports.getValue = async (imageId) => {
    try {
        let conn = await pool.getConnection()
        let result = await value.findByImageId(conn, imageId)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

exports.getKindOfValue = async (analysisId) => {
    try {
        let conn = await pool.getConnection()
        let result = await value.findKindOfValue(conn, analysisId)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

exports.getValueCount = async (analysisId, attributeId) => {
    try {
        let conn = await pool.getConnection()
        let result = await value.findValueCount(conn, analysisId, attributeId)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

exports.getIdealMaxCount = async (query, condition) => {
    try {
        let conn = await pool.getConnection()
        let result = await value.findMaxCount(conn, query, condition)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

exports.getIdealImage = async (query, condition) => {
    try {
        let conn = await pool.getConnection()
        let result = await value.findByCondition(conn, query, condition)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}


exports.getSimilarResult = async (query, condition) => {
    try {
        let conn = await pool.getConnection()
        let result = await value.findByConditionWithResult(conn, query, condition)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

