const express = require('express');
const router = express.Router();
const test = require('../lib/test')

router.get('/:id', (req, res, next) => {
    test.getManager(req, res, next);
})

module.exports = router;