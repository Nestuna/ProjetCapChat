const express = require("express")
const path = require('path')
const captcha = require("../controllers/CaptchaHandler")

const router = express.Router()

router.get('/', (req, res) => {
    let attempts = 0
    if (req.query['attempts']) {
        attempts = req.query['attempts']
    }
    const {neutralImagesPaths, singularImagePath, clue } = captcha.getImagesAndClue()
    const data = {
        neutralImagesPaths: neutralImagesPaths,
        singularImagePath: singularImagePath,
        clue: clue,
        attempts: attempts
    }
    console.log(data)
    res.render('index', data)
})

router.get('/fail', (req, res) => {
    let attempts = 0
    if (req.query['attempts']) {
        attempts = req.query['attempts']
    }
    const {neutralImagesPaths, singularImagePath, clue } = captcha.getImagesAndClue()
    const data = {
        neutralImagesPaths: neutralImagesPaths,
        singularImagePath: singularImagePath,
        clue: clue,
        attempts: attempts
    }
    console.log(data)
    res.render('index', data)
})


module.exports = router