const result = require('../db/query/result')
const pool = require('../db/pool')
const value = require('./value')
const image = require('./value')
const attribute = require('./attribute')
const auth = require('./auth')

exports.createResult = async (content, imageId, analysisId, accountId) => {
    try {
        let conn = await pool.getConnection()
        let row = await result.insert(conn, content, imageId, analysisId, accountId)
        await conn.release()

        return row.insertId
    } catch (err) {
        return 500
    }
}

exports.getResult = async (id) => {
    try {
        let conn = await pool.getConnection()
        let row = await result.findById(id)
        await conn.release()

        return row
    } catch (err) {
        return 500
    }
}

exports.getAccountResult = async (accountId) => {
    try {
        let conn = await pool.getConnection()
        let row = await result.findByAccountId(conn, accountId)
        await conn.release()

        return row
    } catch (err) {
        return 500
    }
}

exports.userResultTable = async (req, res, next) => {
    if(!auth.isLogin(req, res, next)) {
        return 401
    }
    let row = await this.getAccountResult(req.user.id)

    let response = []

    for(let r of row) {
        let model = require('../model/result')(r)
        response.push(model)
    }

    return response
}


exports.userResultView = async (req, res, next) => {
    if(!auth.isLogin(req, res, next)) {
        return 401
    }
    
    let row = await this.getResult(req.body.id)

    let response = require('../model/result')(row[0])

    return response
}


exports.analysisResult = async (req, res, next) => {
    let request = req.body
    let analysisId = request.analysisId
    let analysisData = request.analysisAttribute
    let useImageId = request.useImageId
    let attributes = await attribute.getAttribute(analysisId)
    let values = await value.getKindOfValue(analysisId)
    let attributesLength = attributes.length

    let ideals = []
    let condition = []
    let conditionNum = 0
    let query = 'a.analysisId = ?'
    condition.push(analysisId)

    for(let i = 0; i < attributesLength; ++i) {
        let ideal = {
            attribute : attributes[i].name,
            value,
            count : -1
        }

        for(let v of values) {
            let count = (analysisData[attributes[i].id][v.value])[0]
            
            if(ideal.count === count) {
                ideal.value = -1
                ideal.count = count
            }

            else if(ideal.count < count) {
                ideal.value = v.value
                ideal.count = (analysisData[a.id][v.value])[0]
            }
        }

        if(ideal.value !== -1) {
            if(conditioNum === 0) {
                query = query + ' and '
            }
            ++conditionNum

            query = query + '(attributeId = ? and value = ?)'
            condition.push(a.id)
            condition.push(ideal.value)

            if(i !== attributesLength - 1) {
                query = query + ' or '
            }
        }
        ideals.push(ideal)
    }

    let content = '저희는 당신이 좋아하는 이상형을 분석하기 위해 다양한 기준을 마련했습니다.<br/>당신이 선택한 이미지들을 종합하고 분석하여 당신의 이상형을 이러한 기준에 따라 보여드리겠습니다.<br/>'

    if(analysisId === 1) {
        for(let i = 0; i < ideals.length; ++i) {
            content = content + ideals[i].attribute + '<br/>' + '당신은 ' + ideals[i].value + ' 를(을) 선호합니다.<br/>'
        }
    }

    if(analysisId === 2) {
        for(let i = 0; i < ideals.length; ++i) {
            content = content + ideals[i].attribute + '<br/>' + '당신은 ' + ideals[i].value + ' 를(을) 선호합니다.<br/>'
        }
    }

    let maxCount = await value.getIdealMaxCount(query, condition)

    condition.push(maxCount[0].maxCount)

    let idealImages = await image.getIdealImage(query, condition)
    let imageId = 0
    for(idealImage of idealImages) {
        for(i of useImageId) {
            if(idealImage.imageId === i) {
                imageId = i
                break
            }
        }

        if(imageId !== 0) {
            break
        }
    }

    if(imageId === 0) {
        let randomIndex = Math.floor(Math.random() * resultLength)
        imageId = result[randomIndex].imageId
    }

    let accountId = auth.isLogin(req, res, next) ? req.user.id : null

    let id = await this.createResult(content, imageId, analysisId, accountId)

    let response = require('../model/result')(await this.getResult(id))

    return response
}

