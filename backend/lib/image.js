const image = require('../db/query/image')
const value = require('../db/query/value')
const attribute = require('../lib/attribute')
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

exports.getImageByAttribute = async (attributeId, v) => {
    try {
        let conn = await pool.getConnection()
        let result = await value.findByAttributeIdAndValue(conn, attributeId, v)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

exports.getImageByNotAttribute = async (attributeId, v) => {
    try {
        let conn = await pool.getConnection()
        let result = await value.findByAttributeIdAndNotValue(conn, attributeId, v)
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

exports.getImageValue = async (imageId) => {
    try {
        let conn = await pool.getConnection()
        let result = await value.findByImageId(conn, imageId)
        await conn.release()

        return result
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

    return 200
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

    return 200
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

    return 200
}

exports.imageTable = async (req, res, next) => {
    if(!auth.isLogin(req, res, next)) {
        return 401
    }

    let result = await this.getImage(req.body.analysisId)

    let response = []

    for(let r of result) {
        let model = require('../model/image')(r)
        response.push(model)
    }

    return response
}

exports.imageView = async (req, res, next) => {
    if(!auth.isLogin(req, res, next)) {
        return 401
    }

    let result = await this.getImageValue(req.body.imageId)

    let response = []

    for(let r of result) {
        let model = require('../model/image')(r)
        response.push(model)
    }

    return response
}

exports.attributeAdd = async (req, res, next) => {
    if(!auth.isLogin(req, res, next)) {
        return 401
    }

    let status = await attribute.addAttribute(req.body.name, req.body.analysisId)

    return status
}

exports.imageAdd = async (req, res, next) => {
    if(!auth.isLogin(req, res, next)) {
        return 401
    }

    let request = req.body

    let status = await this.addImage(request.path, request.analysisId, request.values, request.attributeId)

    return status
}