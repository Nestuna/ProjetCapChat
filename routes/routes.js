import express from "express"
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import { selectRandomNeutralImages } from './functions.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/index.html'))
})

router.get('/images', (req, res) => {
    const neutralImages = selectRandomNeutralImages()
    console.log(neutralImages);
})

export default router