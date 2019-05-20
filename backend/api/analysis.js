const express = require('express');
const router = express.Router();
const analysis = require('../lib/analysis')

router.get('/analysises', (req, res, next) => {
    analysis.getAnalysis(req, res, next)
})

module.exports = router;