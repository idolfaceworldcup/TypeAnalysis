const pool = require('../pool')

exports.findAll = async () => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select * from test')
        await conn.release()
 
        return result
    } catch(err) {
        return '500'
    }
}

exports.insert = async (path) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('insert into test(test) values(?)', [path])
        await conn.release()

        return result
    } catch(err) {
        return '500'
    }
}