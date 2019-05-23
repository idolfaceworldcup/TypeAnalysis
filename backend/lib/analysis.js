const analysis = require('../db/query/analysis')
const image = require('./image')
const value = require('./value')
const attribute = require('./attribute')
const pool = require('../db/pool')

exports.getAnalysis = async () => {
    let conn = await pool.getConnection()
    let result = await analysis.findAll()
    await conn.release()

    return result
}

exports.getTwoImage = async (analysisId, id1, id2) => {
    let result = await image.getTwoImage(analysisId, id1, id2)

    let images = []

    for(let i = 0; i < result.length; ++i) {
        images[i] = require('../model/image')(result[i])
    }

    return images
}

exports.getAttribute = async (analysisId) => {
    let result = await attribute.getAttribute(analysisId)

    let attributeMap = new Map()

    for(let i = 0; i < result.length; ++i) {
        let valueMap = new Map()
        attributeMap.set(result[i].name, valueMap)
    }

    return attributeMap
}

exports.setAnalysisMap = async (analysisMap) => {
    let result = await value.getValue(imageId)

    for(let i = 0; i < reuslt.length; ++i) {
        let count = analysisMap.get(result[i].attributeName).get(result[i].value)

        if(count === undefined) {
            count = 1
        }

        analysisMap.get(result[i].attributeName).set(result[i].value, ++count)
    }

    return analysisMap
}