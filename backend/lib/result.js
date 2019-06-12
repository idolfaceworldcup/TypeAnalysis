const result = require('../db/query/result')
const pool = require('../db/pool')
const value = require('./value')
const image = require('./image')
const attribute = require('./attribute')
const auth = require('./auth')

exports.createResult = async (content, imageId, analysisId, accountId) => {
    try {
        let conn = await pool.getConnection()
        let row = await result.insert(conn, content, imageId, analysisId, accountId)
        await conn.release()

        return row
    } catch (err) {
        return 500
    }
}

exports.getResult = async (id) => {
    try {
        let conn = await pool.getConnection()
        let row = await result.findById(conn, id)
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

    let row = await this.getResult(req.params.id)

    let response = require('../model/result')(row[0])

    response.imagePath = response.imagePath.replace('\\', '/')

    return response
}


exports.analysisResult = async (req, res, next) => {
    let request = req.body
    let analysisId = parseInt(req.params.analysisId)
    let analysisData = request.analysisData
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
            if(v.attributeId !== attributes[i].id) {
                continue
            }

            let count = analysisData[attributes[i].id][v.value][0]
            
            if(ideal.count === count) {
                ideal.value = -1
                ideal.count = count
            }

            else if(ideal.count < count) {
                ideal.value = v.value
                ideal.count = analysisData[attributes[i].id][v.value][0]
            }
        }

        if(ideal.value !== -1) {
            if(conditionNum === 0) {
                query = query + ' and '
            }

            ++conditionNum

            query = query + '(attributeId = ? and value = ?)'
            condition.push(attributes[i].id)
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
            let temp = ''
            if(ideals[i].attribute === '머리길이') {
                if(ideals[i].value === '보통') {
                    temp = '당신은 남성의 머리길이에 대해서는 크게 신경 쓰지 않는 것 같습니다.<br/>굳이 말하자면 머리가 길거나 짧은 남성보다 평범한 길이의 머리를 선호하는 편입니다.<br/>'
                }

                else if(ideals[i].value === '짧음') {
                    temp = '당신은 평범하거나 짧은 머리를 좀 더 선호하는 편 입니다.<br/>장발의 남성을 선호하지 않고 일반적인 머리 길이의 남성보다 짧은 머리 남성을 좀 더 좋아하는 편입니다.<br/>'
                }
            }

            else if(ideals[i].attribute === '앞머리') {
                if(ideals[i].value === '내림') {
                    temp = '당신이 선호하는 남성은 볼륨매직, 스왈로펌, 댄디컷 등의 헤어 스타일을 가졌습니다.<br/>특히 선호하는 헤어스타일은 앞머리를 내린 헤어스타일로, 앞머리를 내린 남성을 선호한다고 볼 수 있습니다.<br/>'
                }

                else if(ideals[i].value === '가르마') {
                    temp = '당신이 선호하는 남성은 가르마펌, 애즈펌, 포마드 등의 헤어스타일을 가졌습니다.<br/>특히 선호하는 헤어스타일은 가르마를 넘기는 헤어스타일로, 머리에 가르마를 타는 남성을 선호한다고 볼 수 있습니다.<br/>'
                }

                else if(ideals[i].value === '올림') {
                    temp = '당신이 선호하는 남성은 포마드, 올백, 리젠트 등의 헤어스타일을 가졌습니다. <br/>특히 선호하는 헤어스타일은 머리를 올리는 헤어스타일로, 앞머리를 내리지 않고 올리는 남성을 선호한다고 볼 수 있습니다.<br/>'
                }
            }

            else if(ideals[i].attribute === '눈종류') {
                if(ideals[i].value === '보통') {
                    temp = '당신은 남성의 눈에 대해서 크게 신경쓰지 않습니다.<br/>너무 크거나 작은 눈 크기의 남성만 아니라면 당신은 눈에 대해서는 크게 신경 쓰지 않을 것입니다.<br/>'
                }

                else if(ideals[i].value === '고양이') {
                    temp = '당신은 선호하는 남성의 눈은 고양이와 같이 눈 꼬리가 올라가 있습니다.<br/>이러한 눈은 섹시하고 강한 인상을 주고 당신은 이런 남성에게 자연스럽게 끌릴 것입니다.<br/>'
                }

                else if(ideals[i].value === '강아지') {
                    temp = '당신은 선호하는 남성의 눈은 강아지와 같이 눈 꼬리가 내려가 있습니다.<br/>이러한 눈은 훈훈하고 부드러운 인상을 주고 당신은 이런 남성에게 자연스럽게 끌릴 것입니다.<br/>'
                }
            }

            else if(ideals[i].attribute === '피부색') {
                if(ideals[i].value === '보통') {
                    temp = '당신은 피부색에 대해서 크게 신경쓰지 않습니다.<br/>까만 피부, 구릿빛 피부의 남성보다 흰 피부를 더 선호하는 편이긴 하지만 이것을 크게 신경은 쓰지 않을 것입니다.<br/>'
                }

                else if(ideals[i].value === '흰 피부') {
                    temp = '당신은 흰 피부의 남성을 선호합니다.<br/>까만 피부, 구릿빛 피부는 당신에게 있어서 마이너스 요소이지만 흰 피부는 플러스적인 요소입니다.<br/>'
                }

                else if(ideals[i].value === '검은 피부') {
                    temp = '당신은 구릿빛 피부의 남성을 선호합니다.<br/>까만 피부 남성도 꺼려하지 않으며 피부가 너무 흰 남성은 꺼려하는 편입니다.<br/>'
                }
            }

            else if(ideals[i].attribute === '인종') {
                if(ideals[i].value === '동양') {
                    temp = '당신은 동양적인 이목구비를 더 선호합니다.<br/>서양적인 느낌, 서양적인 이목구비를 가진 사람과 동양적인 느낌, 동양적인 이목구비를 가진 남성에게 자연스럽게 끌릴 것입니다.<br/>'
                }

                else if(ideals[i].value === '서양') {
                    temp = '당신은 서양적인 이목구비를 더 선호합니다.<br/>동양적인 느낌, 동양적인 이목구비를 가진 사람과 서양적인 느낌, 서양적인 이목구비를 가진 남성에게 자연스럽게 끌릴 것입니다.<br/>'
                }
            }

            else if(ideals[i].attribute === '스타일') {
                if(ideals[i].value === '카리스마') {
                    temp = '당신은 강렬하거나 섹시한 남성을 더 선호합니다.<br/>리더쉽있고 카리스마 있는 남성에게 자연스럽게 끌릴 것입니다.<br/>'
                }

                else if(ideals[i].value === '부드러움') {
                    temp = '당신은 훈훈하거나 온화한 남성을 더 선호합니다.<br/>부드러운 인상과 헌신하는 스타일의 남성에게 자연스럽게 끌릴 것입니다. <br/>'
                }
            }

            if(temp === '') {
                temp = ideals[i].attribute + '에 대한 분석 결과입니다.<br/>' + '당신은 ' + ideals[i].value + ' 를(을) 선호합니다.<br/>'
            }

            content = content + temp + '</br>'
        }
    }

    if(analysisId === 2) {
        for(let i = 0; i < ideals.length; ++i) {
            let temp = ''
            if(ideals[i].attribute === '머리길이') {
                if(ideals[i].value === '장발') {
                    temp = '당신은 긴 머리의 여성을 선호합니다.<br/>적어도 어깨까지는 내려올 수 있는 중단발까지는 허용하지만 숏컷, 단발은 좋아하지 않습니다.<br/>'
                }

                else if(ideals[i].value === '단발') {
                    temp = '당신은 짧은 머리의 여성을 선호합니다.<br/>머리길이가 어깨 위까지인 중단발에서 단발은 허용하지만 어깨를 넘어가는 긴 머리의 여성은 좋아하지 않습니다.<br/>'
                }
            }

            else if(ideals[i].attribute === '앞머리') {
                if(ideals[i].value === '내림') {
                    temp = '당신은 앞머리가 있는 여성을 선호합니다.<br/>여성이 헤어스타일을 바꾼다면 앞머리가 있는 헤어스타일을 더 선호합니다.<br/>'
                }

                else if(ideals[i].value === '가르마') {
                    temp = '당신은 앞머리가 없는 여성을 선호합니다.<br/>특히 머리를 옆으로 넘기면서 가르마를 타는 헤어스타일을 더 선호합니다.<br/>'
                }

                else if(ideals[i].value === '올림') {
                    temp = '당신은 앞머리가 없는 여성을 선호합니다. <br/>특히 포니테일, 올백머리 같이 올린 머리 종류의 헤어스타일을 더 선호합니다.<br/>'
                }
            }

            else if(ideals[i].attribute === '눈종류') {
                if(ideals[i].value === '보통') {
                    temp = '당신은 여성의 눈에 대해서 크게 신경쓰지 않습니다.<br/>너무 크거나 작은 눈 크기의 여성만 아니라면 당신은 눈에 대해서는 크게 신경 쓰지 않을 것입니다.<br/>'
                }

                else if(ideals[i].value === '고양이') {
                    temp = '당신은 선호하는 여성의 눈은 고양이와 같이 눈 꼬리가 올라가 있습니다.<br/>이러한 눈은 섹시하고 강한 인상을 주고 당신은 이런 여성에게 자연스럽게 끌릴 것입니다.<br/>'
                }

                else if(ideals[i].value === '강아지') {
                    temp = '당신은 선호하는 여성의 눈은 강아지와 같이 눈 꼬리가 내려가 있습니다.<br/>이러한 눈은 부드럽고 온화한 인상을 주고 당신은 이런 여성에게 자연스럽게 끌릴 것입니다.<br/>'
                }
            }

            else if(ideals[i].attribute === '피부색') {
                if(ideals[i].value === '흰 피부') {
                    temp = '당신은 흰 피부의 여성을 선호합니다.<br/>까만 피부, 구릿빛 피부는 당신에게 있어서 마이너스 요소이지만 흰 피부는 플러스적인 요소입니다.<br/>'
                }

                else if(ideals[i].value === '검은 피부') {
                    temp = '당신은 검은 피부의 여성을 선호합니다.<br/>검은 피부, 태닝, 구릿빛의 피부의 여성을 흰 피부보다 더 선호하는 편입니다.<br/>'
                }
            }

            else if(ideals[i].attribute === '인종') {
                if(ideals[i].value === '동양') {
                    temp = '당신은 동양적인 이목구비를 더 선호합니다.<br/>서양적인 느낌, 서양적인 이목구비를 가진 사람과 동양적인 느낌, 동양적인 이목구비를 가진 여성에게 자연스럽게 끌릴 것입니다.<br/>'
                }

                else if(ideals[i].value === '서양') {
                    temp = '당신은 서양적인 이목구비를 더 선호합니다.<br/>동양적인 느낌, 동양적인 이목구비를 가진 사람과 서양적인 느낌, 서양적인 이목구비를 가진 여성에게 자연스럽게 끌릴 것입니다.<br/>'
                }
            }

            else if(ideals[i].attribute === '스타일') {
                if(ideals[i].value === '귀여움') {
                    temp = '당신은 귀여운 스타일의 여성을 좋아합니다.<br/>외모적으로 귀여운 것은 물론이고 연상보다 연하를 더 선호하는 편입니다.<br/>'
                }

                else if(ideals[i].value === '섹시') {
                    temp = '당신은 섹시한 스타일의 여성을 좋아합니다.<br/>외모적으로나 분위기적으로 모두 섹시한 느낌을 가진 여성을 더 선호하는 편입니다.<br/>'
                }

                else if(ideals[i].value === '카리스마') {
                    temp = '당신은 카리스마 있는 여성을 좋아합니다.<br/>리더쉽있고 걸크러쉬 느낌의 여성을 더 선호하는 편입니다.<br/>'
                }

                else if(ideals[i].value === '청순') {
                    temp = '당신은 청순한 스타일의 여성을 좋아합니다.<br/>풋풋하고 밝은 느낌을 가진 여성을 더 선호하는 편입니다.<br/>'
                }

                else if(ideals[i].value === '단아') {
                    temp = '당신은 단아한 스타일의 여성을 좋아합니다.<br/>우아하고 고풍스러운, 아름답다는 표현이 어울리는 여성을 더 선호하는 편입니다.<br/>'
                }
            }

            if(temp === '') {
                temp = ideals[i].attribute + '에 대한 분석 결과입니다.<br/>' + '당신은 ' + ideals[i].value + ' 를(을) 선호합니다.<br/>'
            }

            content = content + temp + '<br/>'
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
        let randomIndex = Math.floor(Math.random() * idealImages.length)
        imageId = idealImages[randomIndex].imageId
    }

    let accountId = auth.isLogin(req, res, next) ? req.user.id : null

    let creating = await this.createResult(content, imageId, analysisId, accountId)

    let data = await this.getResult(creating.insertId)

    let response = require('../model/result')(data[0])

    response.imagePath = response.imagePath.replace('\\', '/')

    return response
}

