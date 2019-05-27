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

exports.createAnalysisMap = async (analysisId) => {
    let attributes = await attribute.getAttribute(analysisId)
    let values = await value.getKindOfValue(analysisId)

    let attributeMap = new Map()

    for(let i = 0; i < attributes.length; ++i) {
        let valueMap = new Map()
        for(let j = 0; j < values.length; ++j) {
            if(values[j].attributeId === attributes[i].id) {
                valueMap.set(values[j].value, 0)
            }
        }
        
        attributeMap.set(attributes[i].id, valueMap)
    }
    return attributeMap
}

exports.setAnalysisMap = async (analysisMap, imageId) => {
    let result = await value.getValue(imageId)

    for(let i = 0; i < reuslt.length; ++i) {
        let count = analysisMap.get(result[i].attributeId).get(result[i].value)

        analysisMap.get(result[i].attributeId).set(result[i].value, ++count)
    }

    return analysisMap
}

exports.analysisStart = async (req, res, next) => {
    let request = req.body

    if(request.status === 0) {
        request.analysisMap = await this.createAnalysisMap(request.analysisId)
        request.status = 1
    }

    else {
        request.analysisMap = await this.setAnalysisMap(request.analysisMap, request.selectImageId)
    }


    let images

    if(request.status === 1) {
        //random
        let result = await image.getImage(request.analysisId)

        let condition = 0
        let randomIndex1
        let randomIndex2
        while(condition === 0) {
            randomIndex1 = Math.floor(Math.random() * result.length)
            randomIndex2 = Math.floor(Math.random() * result.length)

            if(randomIndex1 === randomIndex2) {
                continue;
            }

            condition = 1

            for(let i = 0; i < request.useImageId.length; ++i) {
                if(result[randomIndex1].imageId === request.useImageId[i] || result[randomIndex2].imageId === request.useImageId[i]) {
                    condition = 0
                    break
                }
            }
        }

        images = [require('../model/image')(result[randomIndex1]), require('../model/image')(result[randomIndex2])]

        request.useImageId.push(images[0].imageId)
        request.useImageId.push(images[1].imageId)
    }

    else if(reqeust.status === 2) {
        //atteribute
        let attributes = await attribute.getAttribute(request.analysisId)
        let values = await value.getKindOfValue(request.analysisId)
        
        let result1
        let condition = 0
        for(let i = 0; i < attributes.length; ++i) {
            for(let j = 0; j < values.length; ++j) {
                if(request.analysisMap.get(values[j].value) === 0) {
                    result1 = await image.getImageByAttribute(attributes[i].id, values[j].value)
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
            return 300
        }

        let result2 = await image.getImage(request.analysisId)

        condition = 0
        let randomIndex1
        let randomIndex2
        while(condition === 0) {
            randomIndex1 = Math.floor(Math.random() * result1.length)
            randomIndex2 = Math.floor(Math.random() * result2.length)

            condition = 1
    
            for(let i = 0; i < request.useImageId.length; ++i) {
                if(result1[randomIndex1].imageId === request.useImageId[i] || result2[randomIndex2].imageId === request.useImageId[i]) {
                    condition = 0
                    break
                }
            }
        }

        images = [require('../model/image')(result[randomIndex1]), require('../model/image')(result[randomIndex2])]

        request.useImageId.push(images[0].imageId)
        request.useImageId.push(images[1].imageId)
    }
    
    let response = {
        analysisId : request.analysisId,
        analysisMap : request.analysisMap,
        image : images,
        status : request.status,
        useImageId : request.useImageId,
        count : request.count + 1
    }

    return response
}