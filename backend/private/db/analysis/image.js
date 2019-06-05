(async function () {

    const path = require('path')
    const pool = require('../../../db/pool')
    const analysis = require('../../../db/query/analysis')
    const attribute = require('../../../db/query/attribute')
    const image = require('../../../db/query/image')
    const value = require('../../../db/query/value')
    const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
    const XLSX = require('xlsx')
    const workbook = XLSX.readFile(__dirname + '/이미지_속성_최종.xlsx')
    const analysises = workbook.SheetNames

    let setting = workbook.Sheets[analysises[0]]

    for(let i = 1; i < analysises.length; ++i) {
        if(setting['A' + (i + 1)].v != analysises[i]) {
            console.log('setting error')
            return
        }
    }

    try {
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        for(let num = 1; num < analysises.length; ++num) {
            let folder = setting['B' + (num + 1)].v
            let analysisId = parseInt(analysises[num])

            let exist = await analysis.findById(conn, analysisId)

            if(exist.length === 0) {
                continue
            }

            let worksheet = workbook.Sheets[analysisId]
            let ref = worksheet["!ref"].split(':')
            let startIndex = 0
            let endIndex = 0

            for(let i = 0; i < arr.length; ++i) {
                if(arr[i] === ref[0].substr(0, 1)) {
                    startIndex = i
                    break
                }
            }

            for(let i = startIndex; i < arr.length; ++i) {
                if(arr[i] === ref[1].substr(0, 1)) {
                    endIndex = i
                    break
                }
            }

            let map = new Map()
            let obj = []
            let p = 0
            for(let j = startIndex; j <= endIndex; ++j) {
                let value = worksheet[arr[j] + 2].v
                obj[p++] = value
            }

            map.set(2, obj)

            for(let i = 3; i <= ref[1].substr(1, ref[1].length); ++i) {
                obj = []
                p = 0;
                for(let j = startIndex; j <= endIndex; ++j) {
                    let value = worksheet[arr[j] + i].v
                    
                    if(j === startIndex) {
                        value = path.join(folder, value)
                    }

                    obj[p++] =  value
                }
                map.set(i, obj)
            }

            try {
                let attributeId = []
                let imageId
                for(let j = startIndex; j < endIndex; ++j) {
                    attributeId[j] = (await attribute.insert(conn, map.get(2)[j], analysisId)).insertId
                }

                for(let i = 3; i <= ref[1].substr(1, ref[1].length); ++i) {
                    imageId = (await image.insert(conn, map.get(i)[0], analysisId)).insertId
                    for(let j = startIndex; j < endIndex; ++j) {
                        await value.insert(conn, map.get(i)[j], imageId, attributeId[j])
                    }
                }
            } catch(err) {
                await conn.rollback();
                await conn.release();
                console.log('rollback')
                return '500';
            }
        }
        
        await conn.commit()
        await conn.release()
    } catch(err) {
        console.log('db error')
        return '500'
    }

    console.log('complete! please press ctrl+c')
}) ()