const express = require('express');
const router = express.Router();
const manager = require('../lib/manager')

router.put('/setting', async (req, res, next) => {
    res.send(await manager.setting(req, res, next));
})

module.exports = router;