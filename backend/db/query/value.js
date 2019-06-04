exports.findByAttributeIdAndImageId = async (conn, imageId, attributeId) => {
    try {
        let result = await conn.query('select * from value where imageId = ? and attributeId = ?', [imageId, attributeId])
        
        return result
    } catch(err) {
        return 500
    }
}

exports.findByImageId = async (conn, imageId) => {
    try {
        let result = await conn.query('select *, a.name attributeName from value v left join attribute a on v.attributeId = a.id left join image i on v.imageId = i.id where v.imageId = ?', [imageId])

        return result
    } catch(err) {
        return 500
    }
}

exports.findByAttributeIdAndValue = async (conn, attributeId, value) => {
    try {
        let result = await conn.query('select *, a.name attributeName from value v left join attribute a on v.attributeId = a.id left join image i on v.imageId = i.id where attributeId = ? and v.value = ?', [attributeId, value])

        return result
    } catch(err) {
        return 500
    }
}

exports.findByAttributeIdAndNotValue = async (conn, attributeId, value) => {
    try {
        let result = await conn.query('select * from value v left join image i on v.imageId = i.id where attributeId = ? and v.value != ? ;', [attributeId, value])

        return result
    } catch(err) {
        return 500
    }
}


exports.findValueCount = async (conn, analysisId, attributeId) => {
    try {
        let result = await conn.query('select *, count(*) count from value v left join attribute a on v.attributeId = a.id where analysisId = ? and attributeId = ? group by value', [analysisId, attributeId])
    
        return result
    } catch(err) {
        return 500
    }
}

exports.findKindOfValue = async (conn, analysisId) => {
    try {
        let result = await conn.query('select * from value v left join attribute a on v.attributeId = a.id where a.analysisId = ? group by value, attributeId;', [analysisId])

        return result
    } catch(err) {
        return 500
    }
}

exports.findByCondition = async (conn, query, condition) => {
    try {
        let result = await conn.query('select *, a.name attributeName, count(*) count from value v left join attribute a on v.attributeId = a.id left join image i on v.imageId = i.id where ' + query + ' group by v.imageId having count = ? order by count desc', condition)
        
        return result
    } catch(err) {
        return 500
    }
}

exports.findMaxCount = async (conn, query, condition) => {
    try {
        let result = await conn.query('select max(counted) maxCount from (select count(*) as counted from value v left join attribute a on v.attributeId = a.id left join image i on v.imageId = i.id where ' + query + ' group by v.imageId) as counts', condition)
        
        return result
    } catch(err) {
        return 500
    }
}

exports.findByConditionWithResult = async (conn, query, condition) => {
    try {
        let result = await conn.query('select r.*, i.path, a.name, v.value, v.imageId valueImageId, v.attributeId, count(*), count from value v left join attribute a on v.attributeId = a.id left join image i on v.imageId = i.id left join result r on i.id = r.imageId where ' + query + ' group by v.imageId order by count', condition)

        return result
    } catch(err) {
        return 500
    }
}

exports.insert = async (conn, value, imageId, attributeId) => {
    try {
        let result = await conn.query('insert into value(value, imageId, attributeId) values(?, ?, ?)', [value, imageId, attributeId])
    
        return result
    } catch(err) {
        return 500
    }
}

exports.update = async (conn, value, id) => {
    try {
        let result = await conn.query('update value set value = ? where id = ?', [value, id])

        return result
    } catch(err) {
        return 500
    }
}

exports.deleteByImageId = async (conn, imageId) => {
    try {
        let result = await conn.query('delete from value where imageId = ?', [imageId])

        return result
    } catch(err) {
        return 500
    }
}

exports.deleteByAttributeId = async (conn, attributeId) => {
    try {
        let result = await conn.query('delete from value where attributeId = ?', [attributeId])

        return result
    } catch(err) {
        return 500
    }
}