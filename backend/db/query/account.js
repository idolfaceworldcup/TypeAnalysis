const pool = require('../pool')

exports.findAll = async () => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select * from account')
        await conn.release()
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.findById = async (id) => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select * from account where id = ?', [id])
        await conn.release()
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.findByLoginIdAndPassword = async (loginId, password) => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select * from account where loginId = ? and password = ?', [loginId, password])
        await conn.release()
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.insert = async (loginId, password) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('insert into account(loginId, password) values(?, ?)', [loginId, password])
        await conn.release()
    } catch(err) {
        return '500'
    }
}

exports.update = async (password, id) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('update account set password = ? where id = ?', [password, id])
        await conn.release()
    } catch(err) {
        return '500'
    }
}

exports.delete = async (id) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('delete from account where id = ?', [id])
        await conn.release()
    } catch(err) {
        return '500'
    }
}