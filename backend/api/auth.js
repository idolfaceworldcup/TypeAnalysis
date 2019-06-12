const express = require('express');
const router = express.Router();
const auth = require('../lib/auth')
const account = require('../lib/account')
const { check, validationResult } = require('express-validator/check');

module.exports = (passport) => {
    router.post('/user', passport.authenticate('user', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : false,
        successFlash : false
    }))


    router.post('/manager', passport.authenticate('manager', {
        successRedirect : '/',
        failureRedirect : '/management/login',
        failureFlash : false,
        successFlash : false
    }))

    router.get('/logout', (req, res, next) => {
        res.send(auth.logout(req, res, next))
    })

    router.post('/regist', [
        check('account.loginId').isLength( { max : 20, min : 4 } ),
        check('account.password').isLength( { max : 20, min : 4 } ),
        check('account.passwordValid').exists().custom((value, { req }) => value === req.body.account.password)
    ], async (req, res, next) => {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.sendStatus(412);
        }
        res.sendStatus(await account.regist(req, res, next));
    })

    router.get('/exist', (req, res, next) => {
        res.send(req.user)
    })
    
    return router;
}