const pool = require('../pool')

exports.findByLoginIdAndPassword = async (loginId, password) => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select * from manager where loginId = ? and password = ?', [loginId, password])
        await conn.release()
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.insert = async (loginId, password) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('insert into manager(loginId, password) values(?, ?)', [loginId, password])
        await conn.release()
    } catch(err) {
        return '500'
    }
}

exports.update = async (password, id) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('update manager set password = ? where id = ?', [password, id])
        await conn.release()
    } catch(err) {
        return '500'
    }
}

exports.delete = async (id) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('delete from manager where id = ?', [id])
        await conn.release()
    } catch(err) {
        return '500'
    }
}