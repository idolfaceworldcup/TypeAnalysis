const express = require('express');
const router = express.Router();
const analysis = require('../lib/analysis')

router.get('/analysises', (req, res, next) => {
    res.send(await analysis.getAnalysis())
})

router.post('/start', async (req, res, next) => {
    res.send(await analysis.analysisStart(req, res, next))
})

module.exports = router;