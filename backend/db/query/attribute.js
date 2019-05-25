exports.findByAnalysisId = async (conn, analysisId) => {
    try {
        let result = await conn.query('select * from attribute where analysisId = ?', [analysisId])
        
        return result
    } catch(err) {
        return 500
    }
}

exports.insert = async (conn, name, analysisId) => {
    try {
        let result = await conn.query('insert into attribute(name, analysisId) values(?, ?)', [name, analysisId])
        
        return result
    } catch(err) {
        return 500
    }
}

exports.delete = async (conn, id) => {
    try {
        let result = await conn.query('delete from attribute where id = ?', [id])

        return result
    } catch(err) {
        return 500
    }
}