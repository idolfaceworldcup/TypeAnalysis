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
        for(let v of values) {
            if(v.attributeId === a.id) {
                valArr[v.value] = 0
                selectAttribute[a.id] =  valArr
            }
        }
    }

    return selectAttribute
}

exports.setSelectAttribute = async (selectAttribute, imageId) => {
    let result = await value.getValue(imageId)

    for(let v of result) {
        ++selectAttribute[v.attributeId][v.value]
    }

    return selectAttribute
}

exports.analysisStart = async (req, res, next) => {
    let request = req.body
    let selectAttribute = request.selectAttribute
    let analysisId = request.analysisId
    let selectImageId = request.selectImageId
    let useImageId = request.useImageId
    let status = request.status
    let images = []
    let randomIndex1
    let randomIndex2
    let condition = 0

    if(status === 0) {
        selectAttribute = await this.createSelectAttribute(analysisId)
        status = 1
    }

    else {
        selectAttribute = await this.setSelectAttribute(selectAttribute, selectImageId)
    }


    if(status === 1) {
        //random
        let result = await image.getImage(analysisId)
        let resultLength = result.length

        while(condition === 0) {
            randomIndex1 = Math.floor(Math.random() * resultLength)
            randomIndex2 = Math.floor(Math.random() * resultLength)

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

        images = [require('../model/image')(result[randomIndex1]), require('../model/image')(result[randomIndex2])]
    }

    else if(status === 2) {
        //atteribute
        let attributes = await attribute.getAttribute(analysisId)
        let values = await value.getKindOfValue(analysisId)
        
        let result1
        
        for(let a of attributes) {
            for(let v of values) {
                if(selectAttribute[a.id][v.value] === 0) {
                    result1 = await image.getImageByAttribute(a.id, v.value)
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
            return 200
        }

        let result2 = await image.getImage(analysisId)

        condition = 0
        while(condition === 0) {
            randomIndex1 = Math.floor(Math.random() * result1.length)
            randomIndex2 = Math.floor(Math.random() * result2.length)

            condition = 1
    
            for (let imageId of useImageId) {
                if(result1[randomIndex1].imageId === iamgeId || result2[randomIndex2].imageId === imageId) {
                    condition = 0
                    break
                }
            }
        }

        images = [require('../model/image')(result[randomIndex1]), require('../model/image')(result[randomIndex2])]
    }

    useImageId.push(images[0].imageId)
    useImageId.push(images[1].imageId)
    
    let response = {
        analysisId : analysisId,
        selectAttribute : selectAttribute,
        image : images,
        status : status,
        useImageId : useImageId,
        count : count + 1
    }

    return response
}