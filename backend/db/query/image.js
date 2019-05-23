const pool = require('../pool')

exports.findByAnalysisId = async (conn, analysisId) => {
    try {
        let result = await conn.query('select * from image where analysisId = ?', [analysisId])
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.findByAnalysisIdAndIds = async (conn, analysisId, id1, id2) => {
    try {
        let result = await conn.query('select * from image where analysisId = ? and (id = ? or id = ?)', [analysisId, id1, id2])
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.insert = async (conn, path, analysisId) => {
    try {
        let result = await conn.query('insert into image(path, analysisId) values(?, ?)', [path, analysisId])

        return result
    } catch(err) {
        return '500'
    }
}

exports.delete = async (conn, id) => {
    try {
        let result = await conn.query('delete from image where id = ?', [id])

        return result
    } catch(err) {
        return '500'
    }
}