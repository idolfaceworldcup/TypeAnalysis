const express = require('express');
const router = express.Router();
const analysis = require('../lib/analysis')
const result = require('../lib/result')
const image = require('../lib/image')
const file = require('../lib/file')
const sharp = require('sharp')
const fs = require('fs').promises

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

router.post('/image/upload/man', async (req, res, next) => {
    let upload = await file.manUpload(req, res, next)
    upload(req, res, async err => {
        if (err) {
            res.sendStatus(500)
        }

        const buffer = await sharp(req.file.path).resize(250, 250).toBuffer()

        await fs.writeFile(req.file.path, buffer)

        res.send(req.file.filename)
    })
})

router.post('/image/upload/woman', async (req, res, next) => {
    let upload = await file.womanUpload(req, res, next)
    upload(req, res, async err => {
        if (err) {
            res.sendStatus(500)
        }

        const buffer = await sharp(req.file.path).resize(250, 250).toBuffer()

        await fs.writeFile(req.file.path, buffer)

        res.send(req.file.filename)
    })
})

module.exports = router;