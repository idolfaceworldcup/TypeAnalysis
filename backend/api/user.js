const express = require('express');
const router = express.Router();
const result = require('../lib/result')
const account = require('../lib/account')
const { check, validationResult } = require('express-validator/check');

router.get('/result', async (req, res, next) => {
    res.send(await result.userResultTable(req, res, next));
})

router.get('/result/:id', async (req, res, next) => {
    res.send(await result.userResultView(req, res, next));
})

router.delete('/management/account/:id', async (req, res, next) => {
    res.sendStatus(await account.deleteAccount(req, res, next));
})

router.delete('/management/account', async (req, res, next) => {
    res.sendStatus(await account.deleteAccounts(req, res, next));
})

router.put('/setting',  [
    check('account.password').isLength( { max : 20, min : 4 } ),
    check('account.newpassword').isLength( { max : 20, min : 4 } )
], async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.sendStatus(412);
    }
    res.sendStatus(await account.setting(req, res, next));
})

router.get('/management/account', async (req, res, next) => {
    res.send(await account.accountTable(req, res, next));
})

router.put('/management/setting',  [
    check('account.password').isLength( { max : 20, min : 4 } ),
    check('account.passwordValid').exists().custom((value, { req }) => value === req.body.account.password)
], async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.sendStatus(412);
    }
    res.sendStatus(await account.settingFromManager(req, res, next));
})

module.exports = router;