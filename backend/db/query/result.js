const pool = require('../pool')

exports.findByAccountId = async (accountId) => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select * from result r left join image i on r.imageId = i.id where accountId = ?', [accountId])
        await conn.release()
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.insert = async (content, imageId, analysisId, accountId) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('insert into result(content, date, analysisId, imageId, accountId) values(?, now(), ?, ?, ?)', [content, analysisId, imageId, accountId])
        await conn.release()
    } catch(err) {
        return '500'
    }
}

exports.delete = async (imageId) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('delete from result where imageId = ?', [imageId])
        await conn.release()
    } catch(err) {
        return '500'
    }
}