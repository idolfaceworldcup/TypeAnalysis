const account = require('../db/query/account')
const pool = require('../db/pool')
const auth = require('../lib/auth')

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

exports.regist = async (req, res, next) => {
    let status = await this.createAccount(req.body.account.loginId, req.body.account.password)
    
    return status
}

exports.setting = async (req, res, next) => {
    if(!auth.isLogin(req, res, next)) {
        return 401
    }
    
    let request = req.body

    let result = await this.getAccount(req.user.id)

    console.log(request.account)

    if(request.account.password !== result[0].password) {
        return 412
    }

    let status = await this.update(request.account.newpassword, req.user.id)

    return status
}