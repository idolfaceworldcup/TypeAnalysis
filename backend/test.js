(async function () {
    const pool = require('./db/pool')
    const conn = await pool.getConnection()
    let result = await conn.query('select *, tt.test temp from test2 tt left join test t on tt.testId = t.id')
    await conn.release()

    console.log(result);
}) ()