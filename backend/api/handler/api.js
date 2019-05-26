const express = require('express');
const router = express.Router();

//define API and use API

module.exports = (passport) => {
    const managerPassport = require('../../lib/managerPassport')(passport)
    const accountPassport = require('../../lib/accountPassport')(passport)

    const managerAPI = require('../manager')
    const loginAPI = require('../login')(accountPassport, managerPassport)
    const analysisAPI = require('../analysis')
    const imageAPI = require('../image')
    const errorAPI = require('../error')

    router.use('/manager', managerAPI)
    router.use('/login', loginAPI)
    router.use('/analysis', analysisAPI)
    router.use('/image', imageAPI)
    router.use('/error', errorAPI)

    return router
}