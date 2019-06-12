const account = require('../db/query/account')
const pool = require('../db/pool')
const auth = require('../lib/auth')

exports.getAllAccount = async () => {
    try {
        let conn = await pool.getConnection()
        let result = await account.findAll(conn)
        await conn.release()

        return result
    } catch (err) {
        return 500
    }
}

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
        await account.delete(id)
        await conn.release()

        return 200
    }
    catch (err) {
        return 500
    }
}

exports.multiDelete = async (ids) => {
    try {
        let conn = await pool.getConnection()
        await conn.beginTransaction()

        try {
            for(id of ids) {
                await account.delete(conn, id)
            }
        } catch(err) {
                await conn.rollback();
                await conn.release();
                return 500
        }
        await conn.commit()
        await conn.release()
    }
    catch (err) {
        return 500
    }

    return 200
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

    if(request.account.password !== result[0].password) {
        return 412
    }

    let status = await this.update(request.account.newpassword, req.user.id)

    return status
}

exports.accountTable = async (req, res, next) => {
    let result = await this.getAllAccount()
    let response = []

    for(let r of result) {
        let model = require('../model/account')(r)
        response.push(model)
    }

    return response
}

exports.settingFromManager = async (req, res, next) => {
    let request = req.body

    let status = await this.update(request.account.password, request.account.id)

    return status
}

exports.deleteAccount = async (req, res, next) => {
    let status = await this.delete(req.params.id)
    
    return status
}