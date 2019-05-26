const express = require('express');
const router = express.Router();
const auth = require('../lib/auth')
const { check, validationResult } = require('express-validator/check');

module.exports = (accountPassport, managerPassport) => {
    router.post('/account', accountPassport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : false,
        successFlash : false
    }))

    router.post('/manager', managerPassport.authenticate('local', {
        successRedirect : '/manager',
        failureRedirect : '/manager/login',
        failureFlash : false,
        successFlash : false
    }))

    router.post('/logout', (req, res, next) => {
        res.send(auth.logout(req, res, next))
    })

    router.post('/regist', [
        check('loginId').isEmail().isLength( { max : 15, min : 4 } ),
        check('password').isLength( { max : 20, min : 4 } ),
        check('passwordValid').exists().custom((value, { req }) => value === req.body.password),
    ], (req, res, next) => {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return false;
        }
        res.send(auth.regist(req, res, next));
    })

    return router;
}