exports.findById = async (conn, id) => {
    try {
        let result = await conn.query('select * from result r left join image i on r.imageId = i.id where r.id = ?', [id])

        return result
    } catch(err) {
        return 500
    }
}

exports.findByAccountId = async (conn, accountId) => {
    try {
        let result = await conn.query('select * from result r left join image i on r.imageId = i.id where accountId = ?', [accountId])

        return result
    } catch(err) {
        return 500
    }
}

exports.insert = async (conn, content, imageId, analysisId, accountId) => {
    try {
        let result = await conn.query('insert into result(content, date, analysisId, imageId, accountId) values(?, now(), ?, ?, ?)', [content, analysisId, imageId, accountId])
        
        return result
    } catch(err) {
        return 500
    }
}

exports.delete = async (conn, imageId) => {
    try {
        let result = await conn.query('delete from result where imageId = ?', [imageId])

        return result
    } catch(err) {
        return 500
    }
}