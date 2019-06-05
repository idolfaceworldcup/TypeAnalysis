const express = require('express');
const router = express.Router();
const result = require('../lib/result')
const account = require('../lib/account')

router.get('/result', async (req, res, next) => {
    res.send(await result.userResultTable(req, res, next));
})

router.get('/result/:id', async (req, res, next) => {
    res.send(await result.userResultView(req, res, next));
})

router.put('/setting/:id', async (req, res, next) => {
    res.sendStatus(await account.setting(req, res, next));
})

module.exports = router;