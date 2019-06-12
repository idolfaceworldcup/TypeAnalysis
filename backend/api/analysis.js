const express = require('express');
const router = express.Router();
const analysis = require('../lib/analysis')
const result = require('../lib/result')
const image = require('../lib/image')
const file = require('../lib/file')
const uploader = file.getImageUploader()

router.get('/analysises', async (req, res, next) => {
    res.send(await analysis.enableAnalysis(req, res, next))
})

router.post('/start/:analysisId', async (req, res, next) => {
    res.send(await analysis.analysisStart(req, res, next))
})


router.post('/result/:analysisId', async (req, res, next) => {
    res.send(await result.analysisResult(req, res, next))
})

router.get('/management/image/:analysisId', async (req, res, next) => {
    res.send(await image.imageTable(req, res, next))
})

router.get('/management/image/value/:id', async (req, res, next) => {
    res.send(await image.imageView(req, res, next))
})

router.get('/management/image/attribute/:analysisId', async (req, res, next) => {
    res.send(await image.setImageForm(req, res, next))
})

router.post('/management/attribute', async (req, res, next) => {
    res.send(await image.attributeAdd(req, res, next))
})

router.post('/management/image', async (req, res, next) => {
    res.send(await image.imageAdd(req, res, next))
})

router.delete('/management/image/:id', async (req, res, next) => {
    res.sendStatus(await image.imageDelete(req, res, next))
})

router.post('/image/upload', async (req, res, next) => {
    uploader(req, res, async err => {
        if (err) {
            res.sendStatus(500)
        }

        res.send(await file.resizeImage(req))
    })
})

module.exports = router;