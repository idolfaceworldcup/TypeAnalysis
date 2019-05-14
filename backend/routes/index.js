const express = require('express');
const router = express.Router();
const test = require('../lib/test')

router.get('/', (req, res, next) => {
    test.myTest(req, res, next);
})

module.exports = router;