const express = require('express');
const router = express.Router();
const image = require('../lib/image')

router.get('/slide', async (req, res, next) => {
    res.send(await image.setMainSlide(req, res, next));
})

module.exports = router;