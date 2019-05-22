const pool = require('../pool')

exports.findAll = async (conn) => {
    try {
        let result = await conn.query('select * from test')
 
        return result
    } catch(err) {
        return '500'
    }
}

exports.insert = async (conn, path) => {
    try {
        let result = await conn.query('insert into test(test) values(?)', [path])

        return result
    } catch(err) {
        return '500'
    }
}