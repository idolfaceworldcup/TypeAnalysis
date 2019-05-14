const express = require('express');
const router = express.Router();

router.get('/401', (req, res, next) => {
    res.status(404).send();
})

router.get('/403', (req, res, next) => {
    res.status(403).send();
})

router.get('/404', (req, res, next) => {
    res.status(404).send();
})

router.get('/500', (req, res, next) => {
    res.status(500).send();
})

module.exports = router;