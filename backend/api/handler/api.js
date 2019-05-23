const express = require('express');
const router = express.Router();
//define API and use API
const managerAPI = require('../manager')
const accountAPI = require('../error')
const analysisAPI = require('../error')
const imageAPI = require('../error')
const errorAPI = require('../error')

router.use('/manager', managerAPI)
router.use('/account', accountAPI)
router.use('/analysis', analysisAPI)
router.use('/image', imageAPI)
router.use('/error', errorAPI)

module.exports = router;