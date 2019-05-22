const pool = require('../pool')

exports.findAll = async (conn) => {
    try {
        let result = await conn.query('select * from manager')

        return result
    } catch(err) {
        return '500'
    }
}

exports.findByLoginIdAndPassword = async (conn, loginId, password) => {
    try {
        let result = await conn.query('select * from manager where loginId = ? and password = ?', [loginId, password])

        return result
    } catch(err) {
        return '500'
    }
}

exports.insert = async (conn, loginId, password) => {
    try {
        let result = await conn.query('insert into manager(loginId, password) values(?, ?)', [loginId, password])

        return result
    } catch(err) {
        return '500'
    }
}

exports.update = async (conn, password, id) => {
    try {
        let result = await conn.query('update manager set password = ? where id = ?', [password, id])

        return result
    } catch(err) {
        return '500'
    }
}

exports.delete = async (conn, id) => {
    try {
        let result = await conn.query('delete from manager where id = ?', [id])
        
        return result
    } catch(err) {
        return '500'
    }
}