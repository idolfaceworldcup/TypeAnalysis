const express = require('express');
const router = express.Router();
const test = require('../lib/test')

router.get('/test', async (req, res, next) => {
    res.send(await test.myTest());
})

module.exports = router;