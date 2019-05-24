const express = require('express');
const router = express.Router();
//define API and use API
const managerAPI = require('../manager')
const accountAPI = require('../account')
const analysisAPI = require('../analysis')
const imageAPI = require('../image')
const errorAPI = require('../error')

router.use('/manager', managerAPI)
router.use('/account', accountAPI)
router.use('/analysis', analysisAPI)
router.use('/image', imageAPI)
router.use('/error', errorAPI)

module.exports = router;