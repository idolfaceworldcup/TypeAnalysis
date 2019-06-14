const express = require('express');
const router = express.Router();

//define API and use API

module.exports = (app) => {
    const passport = require('../../lib/passport')(app)

    const imageAPI = require('../image')
    const managerAPI = require('../manager')
    const authAPI = require('../auth')(passport)
    const analysisAPI = require('../analysis')
    const userAPI = require('../user')
    const errorAPI = require('../error')

    router.use('/image', imageAPI)
    router.use('/manager', managerAPI)
    router.use('/auth', authAPI)
    router.use('/analysis', analysisAPI)
    router.use('/user', userAPI)
    router.use('/error', errorAPI)

    return router
}