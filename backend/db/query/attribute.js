const pool = require('../pool')

exports.findByAnalysisId = async (analysisId) => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select * from attribute where analysisId = ?', [analysisId])
        await conn.release()
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.insert = async (name, analysisId) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('insert into attribute(name, analysisId) values(?, ?)', [name, analysisId])
        await conn.release()
    } catch(err) {
        return '500'
    }
}

exports.delete = async (id) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('delete from attribute where id = ?', [id])
        await conn.release()
    } catch(err) {
        return '500'
    }
}