const express = require('express');
const router = express.Router();
const analysis = require('../lib/analysis')
const result = require('../lib/result')

router.get('/analysises', async (req, res, next) => {
    res.send(await analysis.enableAnalysis(req, res, next))
})

router.post('/start/:analysisId', async (req, res, next) => {
    res.send(await analysis.analysisStart(req, res, next))
})


router.post('/result/:analysisId', async (req, res, next) => {
    res.send(await result.analysisResult(req, res, next))
})

module.exports = router;