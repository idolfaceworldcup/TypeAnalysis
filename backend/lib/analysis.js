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

// exports.getTwoImage = async (analysisId, id1, id2) => {
//     let result = await image.getTwoImage(analysisId, id1, id2)

//     let images = []

//     for(let i = 0; i < result.length; ++i) {
//         images[i] = require('../model/image')(result[i])
//     }

//     return images
// }

exports.createAnalysisMap = async (analysisId) => {
    let result = await attribute.getAttribute(analysisId)

    let attributeMap = new Map()

    for(let i = 0; i < result.length; ++i) {
        let valueMap = new Map()
        attributeMap.set(result[i].name, valueMap)
    }

    return attributeMap
}

exports.setAnalysisMap = async (analysisMap, imageId) => {
    let result = await value.getValue(imageId)

    for(let i = 0; i < reuslt.length; ++i) {
        let count = analysisMap.get(result[i].attributeName).get(result[i].value)

        if(count === undefined) {
            count = 0
        }

        analysisMap.get(result[i].attributeName).set(result[i].value, ++count)
    }

    return analysisMap
}

exports.analysisStart = async (req, res, next) => {
    let request = req.body
    request.analysisId = 1
    request.useImageId = [1, 2]
    request.status = 0
    if(request.status === 0) {
        request.analysisMap = await this.createAnalysisMap(request.analysisId)
        request.status = 1
    }

    else {
        request.analysisMap = await this.setAnalysisMap(request.analysisMap, request.selectImageId)
    }


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
            if(randomIndex1 === request.useImageId[i] || randomIndex2 === request.useImageId[i]) {
                condition = 0
                break
            }
        }
    }

    let images = [require('../model/image')(result[randomIndex1]), require('../model/image')(result[randomIndex2])]

    request.useImageId.push(randomIndex1)
    request.useImageId.push(randomIndex2)

    console.log(request.useImageId)
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