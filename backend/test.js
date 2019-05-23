(async function () {
    const pool = require('./db/pool')
    const conn = await pool.getConnection()
    let result = await conn.query('select * from attribute where analysisId = 1')
    await conn.release()

    let map1 = new Map()

    for(let i = 0; i < result.length; ++i) 
    {
        let map2 = new Map()
        map2.set('값1')
        map2.set('값2')
        map1.set(result[i].name, map2)
    }
    console.log(map1);

    map1.get('스타일').set('값1', 3)
    console.log(map1)
    map1.get('스타일').set('값1', 5)
    console.log(map1)
    
}) ()