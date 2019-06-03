const manager = require('../db/query/manager')
const pool = require('../db/pool')
const auth = require('../lib/auth')

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

exports.getManager = async (id) => {
    try {
        let conn = await pool.getConnection()
        let result = await manager.findById(conn, id)
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

        return 200
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

        return 200
    }
    catch (err) {
        return 500
    }
}

exports.setting = async (req, res, next) => {
    if(!auth.isLogin(req, res, next)) {
        return 401
    }
    
    let status = await this.update(req.body.password, req.user.id)

    return status
}
