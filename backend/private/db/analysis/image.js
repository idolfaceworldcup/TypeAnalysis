(async function () {

    const path = require('path')
    const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
    const XLSX = require('xlsx')
    let workbook = XLSX.readFile(__dirname + '/이미지_속성_엑셀_남자_v1.xlsx')
    let worksheet = workbook.Sheets['남자']
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

    for(let i = 3; i <= ref[1].substr(1, ref[1].length); ++i) {
        let obj = []
        let p = 0;
        for(let j = startIndex; j <= endIndex; ++j) {
            let value = worksheet[arr[j] + i].v
            
            if(j === startIndex)
                value = path.join(__dirname,'../../../public/analysis/image/analysis_man', value)
            
            obj[p++] =  value
        }
        map.set(i, obj)
    }

    const test = require('../../../db//query/test')

    await test.insert(map.get(3)[0])

    console.log(await test.findAll())
}) ()