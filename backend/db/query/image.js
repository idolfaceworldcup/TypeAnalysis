const pool = require('../pool')

exports.findByAnalysisId = async (analysisId) => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select * from image where analysisId = ?', [analysisId])
        await conn.release()
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.insert = async (path, analysisId) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('insert into image(path, analysisId) values(?, ?)', [path, analysisId])
        await conn.release()
    } catch(err) {
        return '500'
    }
}

exports.delete = async (id) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('delete from image where id = ?', [id])
        await conn.release()
    } catch(err) {
        return '500'
    }
}