(async function () {
    const attribute = require('./lib/attribute')
    const value = require('./lib/value')
    let attributes = await attribute.getAttribute(2)
    let values = await value.getKindOfValue(2)

    let arr = {}
    for(let a of attributes) {
        let valArr = {}
        for(let v of values) {
            if(v.attributeId === a.id) {
                valArr[v.value] = 0
                arr[a.id] =  valArr
            }
        }
    }

    let t = attributes[0].id

    console.log(arr)
    console.log(++arr[t]['장발'])
    console.log(arr[t]['장발'])
}) ()