const express = require('express');
const router = express.Router();
//define API and use API
const managerAPI = require('../manager')
const errorAPI = require('../error')

router.use('/manager', managerAPI)
router.use('/error', errorAPI)

module.exports = router;