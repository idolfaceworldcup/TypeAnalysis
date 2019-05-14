var path = require('path')

const XLSX = require('xlsx')
let workbook = XLSX.readFile(__dirname + '/이미지_속성_엑셀.xlsx')
let worksheet = workbook.Sheets['남자']
console.log(worksheet)

//console.log(path.resolve(__dirname + '../../../../public'))

