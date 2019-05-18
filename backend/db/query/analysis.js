const pool = require('../pool')

exports.findAll = async () => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select * from analysis')
        await conn.release()
        
        return result
    } catch(err) {
        return '500'
    }
}