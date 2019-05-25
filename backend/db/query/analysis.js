exports.findAll = async (conn) => {
    try {
        let result = await conn.query('select * from analysis')
        
        return result
    } catch(err) {
        return 500
    }
}

exports.findById = async (conn, id) => {
    try {
        let result = await conn.query('select * from analysis where id = ?', [id])
        
        return result
    } catch(err) {
        return 500
    }
}