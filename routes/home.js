import express from "express"
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import CaptchaHandler from "../controllers/CaptchaHandler.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()
const captcha = new CaptchaHandler()

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


export default router