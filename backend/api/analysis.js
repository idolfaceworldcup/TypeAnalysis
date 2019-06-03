const express = require('express');
const router = express.Router();
const analysis = require('../lib/analysis')
const result = require('../lib/result')
const image = require('../lib/image')
const attribute = require('../lib/attribute')

router.get('/analysises', async (req, res, next) => {
    res.send(await analysis.enableAnalysis(req, res, next))
})

router.get('/start/:analysisId', async (req, res, next) => {
    res.send(await analysis.analysisStart(req, res, next))
})


router.post('/result/:analysisId', async (req, res, next) => {
    res.send(await result.analysisResult(req, res, next))
})

router.get('/management/image', async (req, res, next) => {
    res.send(await image.imageTable(req, res, next))
})

router.get('/management/image/:id', async (req, res, next) => {
    res.send(await image.imageView(req, res, next))
})

router.post('/management/attribute', async (req, res, next) => {
    res.send(await image.attributeAdd(req, res, next))
})

router.post('/management/image', async (req, res, next) => {
    res.send(await image.imageAdd(req, res, next))
})

module.exports = router;