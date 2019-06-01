const analysis = require('../db/query/analysis')
const image = require('./image')
const value = require('./value')
const attribute = require('./attribute')
const pool = require('../db/pool')

exports.getAnalysis = async () => {
    try {
        let conn = await pool.getConnection()
        let result = await analysis.findAll()
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
    let result = await value.getValue(imageId)

    for(let v of result) {
        let temp = (selectAttribute[v.attributeId][v.value])
        
        (selectAttribute[v.attributeId][v.value])[0] = temp[0] + Math.round(100 * ((temp[1] / temp[2]).toFixed(1)))
    }

    return selectAttribute
}

exports.setGetAttribute = async (selectAttribute, imageId) => {
    let result = await value.getValue(imageId)

    for(let v of result) {
        ++(selectAttribute[v.attributeId][v.value])[1]
    }

    return selectAttribute
}

exports.startRandom = async (analysisId, useImageId) => {
    let result = await image.getImage(analysisId)
    let resultLength = result.length
    let condition = 0

    while(condition === 0) {
        let randomIndex1 = Math.floor(Math.random() * resultLength)
        let randomIndex2 = Math.floor(Math.random() * resultLength)

        if(randomIndex1 === randomIndex2) {
            continue;
        }

        condition = 1

        for(let imageId of useImageId) {
            if(result[randomIndex1].imageId === imageId || result[randomIndex2].imageId === imageId) {
                condition = 0
                break
            }
        }
    }

    let images = [require('../model/image')(result[randomIndex1]), require('../model/image')(result[randomIndex2])]
    
    return images
}

exports.startAdvanced = async (analysisId, useImageId, selectAttribute) => {
    let attributes = await attribute.getAttribute(analysisId)
    let values = await value.getKindOfValue(analysisId)
    let result1
    let result2
    let condition = 0
    
    for(let a of attributes) {
        for(let v of values) {
            let valueTemp  = selectAttribute[a.id][v.value]
            if(valueTemp[1] < 2) {
                result1 = await image.getImageByAttribute(a.id, v.value)
                result2 = await image.getImageByNotAttribute(a.id, v.value)

                condition = 1
                break
            }
        }

        if(condition === 1) {
            break
        }
    }

    if(condition === 0) {
        // end
        if(count < 20) {
            let images = await this.startRandom(analysisId, useImageId)
            status = 3
            let response = await this.createResponse(analysisId, selectAttribute, images, status, useImageId, count)

            return response
        }

        let response = {
            analysisId : analysisId,
            selectAttribute : selectAttribute,
            status : -1,
            useImageId : useImageId,
        }

        return response
    }

    condition = 0
    while(condition === 0) {
        let randomIndex1 = Math.floor(Math.random() * result1.length)
        let randomIndex2 = Math.floor(Math.random() * result2.length)

        condition = 1

        for (let imageId of useImageId) {
            if(result1[randomIndex1].imageId === iamgeId || result2[randomIndex2].imageId === imageId) {
                condition = 0
                break
            }
        }
    }

    let images = [require('../model/image')(result[randomIndex1]), require('../model/image')(result[randomIndex2])]

    return images
}

exports.createResponse = async(analysisId, selectAttribute, images, status, useImageId, count) => {
    selectAttribute = await this.setGetAttribute(selectAttribute, images[0].imageId)
    selectAttribute = await this.setGetAttribute(selectAttribute, images[1].imageId)

    useImageId.push(images[0].imageId)
    useImageId.push(images[1].imageId)

    let response = require('../model/response')(analysisId, selectAttribute, images, status, useImageId, count)

    return response
}

exports.analysisStart = async (req, res, next) => {
    let request = req.body
    let selectAttribute = request.selectAttribute
    let analysisId = request.analysisId
    let selectImageId = request.selectImageId
    let useImageId = request.useImageId
    let status = request.status
    let count = request.count
    let images = []

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
        images = await this.startAdvanced(analysisId, useImageId, selectAttribute)
    }

    let response = await this.createResponse(analysisId, selectAttribute, images, status, useImageId, count)

    return response
}