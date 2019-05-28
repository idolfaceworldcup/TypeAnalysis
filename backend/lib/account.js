const account = require('../db/query/account')
const pool = require('../db/pool')

exports.login = async (loginId, password) => {
    try {
        let conn = await pool.getConnection()
        let result = await account.findByLoginIdAndPassword(conn, loginId, password)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

exports.getAccount = async (id) => {
    try {
        let conn = await pool.getConnection()
        let result = await account.findById(conn, id)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

exports.createAccount = async (loginId, password) => {
    try {
        let conn = await pool.getConnection()
        await account.insert(conn, loginId, password)
        await conn.release()

        return 200
    }
    catch (err) {
        return 500
    }
}

exports.update = async (password, id) => {
    try {
        let conn = await pool.getConnection()
        await account.update(conn, password, id)
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
        await account.delete(conn, id)
        await conn.release()

        return 200
    }
    catch (err) {
        return 500
    }
}
