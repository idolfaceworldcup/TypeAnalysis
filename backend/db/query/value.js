const pool = require('../pool')

exports.findByAttributeIdAndImageId = async (imageId, attributeId) => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select * from value where imageId = ? and attributeId = ?', [imageId, attributeId])
        await conn.release()
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.findByImageId = async (imageId) => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select *, a.name attributeName from value v left join attribute a on v.attributeId = a.id left join image i on v.imageId = i.id where v.imageId = ?', [imageId])
        await conn.release()
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.findByAttributeIdAndValue = async (attributeId, value) => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select *, a.name attributeName from value v left join attribute a on v.attributeId = a.id left join image i on v.imageId = i.id where v.attributeId = ? and v.value = ?', [attributeId, value])
        await conn.release()
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.findByCondition = async (query, condition) => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select *, a.name attributeName, count(*) count from value v left join attribute a on v.attributeId = a.id left join image i on v.imageId = i.id where ' + query + ' group by v.imageId order by count', condition)
        await conn.release()
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.findByConditionWithResult = async (query, condition) => {
    try {
        const conn = await pool.getConnection()
        let result = await conn.query('select r.*, i.path, a.name, v.value, v.imageId valueImageId, v.attributeId, count(*), count from value v left join attribute a on v.attributeId = a.id left join image i on v.imageId = i.id left join result r on i.id = r.imageId where ' + query + ' group by v.imageId order by count', condition)
        await conn.release()
        
        return result
    } catch(err) {
        return '500'
    }
}

exports.insert = async (value, imageId, attributeId) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('insert into value(value, imageId, attributeId) values(?, ?, ?)', [value, imageId, attributeId])
        await conn.release()
    } catch(err) {
        return '500'
    }
}

exports.update = async (value, id) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('update value set value = ? where id = ?', [value, id])
        await conn.release()
    } catch(err) {
        return '500'
    }
}

exports.delete = async (imageId) => {
    try {
        const conn = await pool.getConnection()
        await conn.query('delete from value where imageId = ?', [imageId])
        await conn.release()
    } catch(err) {
        return '500'
    }
}