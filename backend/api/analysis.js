const express = require('express');
const router = express.Router();
const analysis = require('../lib/analysis')

router.get('/analysises', (req, res, next) => {
    res.send(analysis.getAnalysis())
})

module.exports = router;