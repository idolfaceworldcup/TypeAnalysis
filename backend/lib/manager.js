const manager = require('../db/query/manager')
const pool = require('../db/pool')

exports.login = async (loginId, password) => {
    try {
        let conn = await pool.getConnection()
        let result = await manager.findByLoginIdAndPassword(conn, loginId, password)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

exports.update = async (password, id) => {
    try {
        let conn = await pool.getConnection()
        await manager.update(conn, password, id)
        await conn.release()

        return 300
    }
    catch (err) {
        return 500
    }
}

exports.delete = async (id) => {
    try {
        let conn = await pool.getConnection()
        await manager.delete(conn, id)
        await conn.release()

        return 300
    }
    catch (err) {
        return 500
    }
}

