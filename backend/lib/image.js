const image = require('../db/query/image')
const value = require('../db/query/value')
const attribute = require('../lib/attribute')
const file = require('../lib/file')
const pool = require('../db/pool')

exports.getAllImage = async () => {
    try {
        let conn = await pool.getConnection()
        let result = await image.findAll(conn)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

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
        if(values.length !== attributeId.length) {
            return undefined
        }

        for(let v of values) {
            if(v.length === 0 || v === '') {
                return undefined
            }
        }

        let conn = await pool.getConnection()
        await conn.beginTransaction()
        let result
        try {
            result = await image.insert(conn, path, analysisId)

            for(let i = 0; i < attributeId.length; ++i) {
                await value.insert(conn, values[i], result.insertId, attributeId[i])
            }
 
        } catch(err) {
                await conn.rollback();
                await conn.release();
                return undefined
        }
        await conn.commit()
        await conn.release()
        return result
    } catch(err) {
        return undefined
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

exports.deleteImages = async (images) => {
    try {
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try {
            for(let i of images) {
                await value.deleteByImageId(conn, i.id)
                await image.delete(conn, i.id)
                await file.imageFileDelete(i.path)
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

exports.deleteImage = async (id, path) => {
    try {
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try {
            await value.deleteByImageId(conn, id)
            await image.delete(conn, id)
            await file.imageFileDelete(path)
            
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

exports.setMainSlide = async (req, res, next) => {
    try {
        let result = await this.getAllImage()
        let resultLength = result.length

        let randomIndex = []

        randomIndex.push(Math.floor(Math.random() * resultLength))

        for(let i = 0; i < 5; ++i) {
            while(true) {
                let temp = Math.floor(Math.random() * resultLength)

                if(randomIndex[i] !== temp) {
                    randomIndex.push(temp)
                    break
                }
            }
        }

        let response = []

        for(let i of randomIndex) {
            response.push(require('../model/image')(result[i]))
        }

        for(let i = 0; i < response.length; ++i) {
            response[i].path = response[i].path.replace('\\', '/')
            response[i].path = `/analysis/image/` + response[i].path
        }

        return response
    } catch(err) {
        return 500
    }
}

exports.imageTable = async (req, res, next) => {
    try {
        let result = await this.getImages(req.params.analysisId)
        let response = []

        for(let r of result) {
            let model = require('../model/image')(r)
            response.push(model)
        }

        return response
    } catch(err) {
        return 500
    }
}

exports.imageView = async (req, res, next) => {
    try {
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
    } catch (err) {
        return 500
    }
}

exports.attributeAdd = async (req, res, next) => {
    let status = await attribute.addAttribute(req.body.name, req.body.analysisId)

    return status
}

exports.imageAdd = async (req, res, next) => {
    try {
        let request = req.body.image
        let fileName = req.body.fileName
        let path
        

        if(request.analysisId == 1) {
            path = 'analysis_man\\' + fileName
        }

        else if(request.analysisId == 2) {
            path = 'analysis_woman\\' + fileName
        }

        let attributeId = []

        for(let attribute of request.attributes) {
            attributeId.push(attribute.id)
        }

        let status = await this.addImage(path, request.analysisId, request.values, attributeId)

        if(status === undefined) {
            await file.imageFileDelete(path)
            return 500
        }

        let result = await this.getImage(status.insertId)

        let response = require('../model/image')(result[0])

        return response
    } catch (err) {
        return 500
    }
}

exports.setImageForm = async (req, res, next) => {
    try {
        let result = await attribute.getAttribute(req.params.analysisId)

        let response = []

        for(let r of result) {
            let model = require('../model/attribute')(r)
            response.push(model)
        }

        return response
    } catch(err) {
        return 500
    }
}

exports.imageDelete = async (req, res, next) => {
    let status = await this.deleteImage(req.params.id, req.body.path)

    return status
}

exports.imagesDelete = async (req, res, next) => {
    let status = await this.deleteImages(req.body.images)

    return status
}