const express = require('express');
const router = express.Router();
const analysis = require('../lib/analysis')

router.get('/analysises', (req, res, next) => {
    res.send(analysis.getAnalysis())
})

router.post('/start', async (req, res, next) => {
    console.log('??')
    res.send(await analysis.analysisStart(req, res, next))
})

module.exports = router;