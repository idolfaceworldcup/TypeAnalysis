const pool = require('../db/pool')
const query = require('../db/query/manager')

exports.myTest = async () => {
    try {
        let map = new Map()

        map.set(1, 'hi')
        map.set(2, 'hi')
        map.set(4, 'hi')
        map.set(3, 'hi')

        console.log(map)
        console.log(map.keys())
        console.log(map.keys()[1])

        return map
    } catch(err) {
        return 'error'
    }
}