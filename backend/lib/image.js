const image = require('../db/query/image')
const value = require('../db/query/value')
const attribute = require('../db/query/attribute')
const pool = require('../db/pool')

exports.getImage = async (analysisId) => {
    try {
        let conn = await pool.getConnection()
        let result = await image.findByAnalysisId(conn, analysisId)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

exports.getImageByAttribute = async (attributeId, value) => {
    try {
        let conn = await pool.getConnection()
        let result = await value.findByCondition(conn, attributeId, value)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

exports.getImageByQuery = async (query, condition) => {
    try {
        let conn = await pool.getConnection()
        let result = await value.findByCondition(conn, query, condition)
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

        return 300
    } catch (err) {
        return 500
    }
}

exports.addImage = async (path, analysisId, values, attributeId) => {
    try {
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try {
            let imageId = (await image.insert(conn, path, analysisId)).insertId
            for(let i = 0; i < attributeId.length; ++i) {
                await value.insert(conn, values[i], imageId, attributeId[i])
            }
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

    return 300
}

exports.updateImage = async (values, valueId) => {
    try {
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try {
            for(let i = 0; i < values.length; ++i) {
                await value.update(conn, values[i], valueId[i])
            }
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

    return 300
}

exports.deleteImage = async (imageId) => {
    try {
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try {
            await value.deleteByImageId(conn, imageId)
            await image.delete(conn, imageId)
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

    return 300
}