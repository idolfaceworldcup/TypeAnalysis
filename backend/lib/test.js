const pool = require('../db/pool')
const query = require('../db/query/manager')

exports.myTest = async () => {
    try {
        const conn = await pool.getConnection()
        let managers = await query.findAll(conn)
        await conn.release()
        let manager = require('../model/manager')(managers[0])
        
        console.log(manager)

        return manager
    } catch(err) {
        return 'error'
    }
}