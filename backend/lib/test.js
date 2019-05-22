const pool = require('../db/pool')
const query = require('../db/qeury/manager')

exports.myTest = async (req, res, next) => {
    try {
        const conn = await pool.getConnection()
        let managers = await query.findAll(conn)
        await conn.release()
        let manager = require('../model/manager')(managers[0])
        console.log(manager)
        res.send(manager)
    } catch(err) {
        return 'error'
    }
}