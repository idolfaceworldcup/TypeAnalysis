const image = require('../db/query/image')
const value = require('../db/query/value')
const attribute = require('../lib/attribute')
const pool = require('../db/pool')

exports.getImages = async (analysisId) => {
    try {
        let conn = await pool.getConnection()
        let result = await image.findByAnalysisId(conn, analysisId)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

exports.getImage = async (imageId) => {
    try {
        let conn = await pool.getConnection()
        let result = await image.findById(conn, imageId)
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
        let imageId
        try {
            imageId = (await image.insert(conn, path, analysisId)).insertId

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
        return imageId
    } catch(err) {
        return 500
    }
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
    let result = await this.getImages(req.params.analysisId)
    let response = []

    for(let r of result) {
        let model = require('../model/image')(r)
        response.push(model)
    }

    return response
}

exports.imageView = async (req, res, next) => {
    let result = await this.getImageValue(req.params.id)

    let response = []

    for(let r of result) {
        let model = require('../model/image')(r)
        response.push(model)
    }

    for(let i = 0; i < response.length; ++i) {
        response[i].path = response[i].path.replace('\\', '/')
    }

    return response
}

exports.attributeAdd = async (req, res, next) => {
    let status = await attribute.addAttribute(req.body.name, req.body.analysisId)

    return status
}

exports.imageAdd = async (req, res, next) => {
    let request = req.body.image
    let path = req.body.path

    if(request.analysisId == 1) {
        path = 'analysis_man\\' + path
    }

    else if(request.analysisId == 2) {
        path = 'analysis_woman\\' + path
    }

    let attributeId = []

    for(let attribute of request.attributes) {
        attributeId.push(attribute.id)
    }

    let imageId = await this.addImage(path, request.analysisId, request.values, attributeId)

    let result = await this.getImage(imageId)

    let response = require('../model/image')(result[0])

    return response
}

exports.setImageForm = async (req, res, next) => {
    let result = await attribute.getAttribute(req.params.analysisId)

    let response = []

    for(let r of result) {
        let model = require('../model/attribute')(r)
        response.push(model)
    }

    return response
}

exports.imageDelete = async (req, res, next) => {
    let status = await this.deleteImage(req.params.id)

    return status
}