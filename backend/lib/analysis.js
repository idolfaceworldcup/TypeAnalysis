const analysis = require('../db/query/analysis')
const image = require('./image')
const value = require('./value')
const attribute = require('./attribute')
const pool = require('../db/pool')

exports.getAnalysis = async () => {
    try {
        let conn = await pool.getConnection()
        let result = await analysis.findAll(conn)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

exports.createSelectAttribute = async (analysisId) => {
    let attributes = await attribute.getAttribute(analysisId)
    let values = await value.getKindOfValue(analysisId)
    
    let selectAttribute = {}
    for(let a of attributes) {
        let valArr = {}
        let valueCount = await value.getValueCount(analysisId, a.id)
        for(let v of values) {
            if(v.attributeId === a.id) {
                for(let c of valueCount) {
                    if(c.value === v.value) {
                        valArr[v.value] = [0, 0, c.count]
                        break;
                    }
                }
                selectAttribute[a.id] =  valArr
            }
        }
    }

    return selectAttribute
}

exports.setSelectAttribute = async (selectAttribute, imageId) => {
    let result = await image.getImageValue(imageId)

    for(let v of result) {
        let temp = (selectAttribute[v.attributeId][v.value])
        
        selectAttribute[v.attributeId][v.value][0] = temp[0] + Math.round(100 * ((temp[1] / temp[2]).toFixed(1)))
    }

    return selectAttribute
}

exports.setGetAttribute = async (selectAttribute, imageId) => {
    let result = await image.getImageValue(imageId)

    for(let v of result) {
        ++selectAttribute[v.attributeId][v.value][1]
    }

    return selectAttribute
}

exports.startRandom = async (analysisId, useImageId) => {
    let result = await image.getImages(analysisId)
    let resultLength = result.length
    let condition = 0

    let randomIndex1
    let randomIndex2

    while(condition === 0) {
        randomIndex1 = Math.floor(Math.random() * resultLength)
        randomIndex2 = Math.floor(Math.random() * resultLength)

        if(randomIndex1 === randomIndex2) {
            continue;
        }

        condition = 1

        for(let imageId of useImageId) {
            if(result[randomIndex1].id === imageId || result[randomIndex2].id === imageId) {
                condition = 0
                break
            }
        }
    }

    let images = [require('../model/image')(result[randomIndex1]), require('../model/image')(result[randomIndex2])]

    return images
}

exports.startAdvanced = async (analysisId, useImageId, selectAttribute, count) => {
    let values = await value.getKindOfValue(analysisId)
    let result1
    let result2
    let condition = 0

    for(let v of values) {
        let valueTemp  = selectAttribute[v.attributeId][v.value]
        
        if(valueTemp[1] < 2) {
            result1 = await image.getImageByAttribute(v.attributeId, v.value)
            result2 = await image.getImageByNotAttribute(v.attributeId, v.value)

            condition = 1
            break
        }

        if(condition === 1) {
            break
        }
    }

    if(condition === 0) {
        // end
        return undefined
    }

    condition = 0
    let randomIndex1
    let randomIndex2
    let temp = []

    for(let r of result1) {
        for (let imageId of useImageId) {
            if(r.id === imageId) {
                condition = 1
                break
            }
        }
        
        if(condition === 0) {
            temp.push(r)
        }

        condition = 0
    }

    if(temp.length === 0) {
        return undefined
    }

    result1 = temp

    while(condition === 0) {
        randomIndex1 = Math.floor(Math.random() * result1.length)
        randomIndex2 = Math.floor(Math.random() * result2.length)
        condition = 1

        for (let imageId of useImageId) {
            if(result1[randomIndex1].id === imageId || result2[randomIndex2].id === imageId) {
                condition = 0
                break
            }
        }
    }

    let images = [require('../model/image')(result1[randomIndex1]), require('../model/image')(result2[randomIndex2])]

    return images
}

exports.createResponse = async(analysisId, selectAttribute, images, status, useImageId, count) => {
    selectAttribute = await this.setGetAttribute(selectAttribute, images[0].id)
    selectAttribute = await this.setGetAttribute(selectAttribute, images[1].id)
    useImageId.push(images[0].id)
    useImageId.push(images[1].id)

    images[0].path = images[0].path.replace('\\', '/')
    images[1].path = images[1].path.replace('\\', '/')

    let response = require('../model/response')(analysisId, selectAttribute, images, status, useImageId, count)

    return response
}

exports.enableAnalysis = async (req, res, next) => {
    let result = await this.getAnalysis()
    let response = []

    for(let r of result) {
        let model = require('../model/analysis')(r)
        response.push(model)
    }

    return response
}

exports.analysisStart = async (req, res, next) => {
    let request = req.body
    let selectAttribute = request.selectAttribute
    let analysisId = req.params.analysisId
    let selectImageId = request.selectImageId
    let useImageId = request.useImageId
    let status = request.status
    let count = request.count
    let images = []

    if(count > 20) {
        let response = {
            analysisId : analysisId,
            selectAttribute : selectAttribute,
            status : -1,
            useImageId : useImageId,
        }

        return response
    }

    if(status === 0) {
        selectAttribute = await this.createSelectAttribute(analysisId)
        status = 1
    }

    else {
        selectAttribute = await this.setSelectAttribute(selectAttribute, selectImageId)
    }

    if(count > 10 && status === 1) {
        status = 2
    }

    if(status === 1 || status === 3) {
        //random
        images = await this.startRandom(analysisId, useImageId)
    }

    else if(status === 2) {
        //atteribute
        images = await this.startAdvanced(analysisId, useImageId, selectAttribute, count)
        if(images === undefined) {
            status = 3
            images = await this.startRandom(analysisId, useImageId)
        }
    }

    let response = await this.createResponse(analysisId, selectAttribute, images, status, useImageId, count)

    return response
}