import express from "express"
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import ImagesHandler from '../controllers/ImagesHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()
const img = new ImagesHandler()

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/index.html'))
})

router.get('/images', (req, res) => {
    const neutralImages = img.getRandomNeutralImages()
    const singularImage = img.getRandomSingularImage()
    console.log(`Neutral Images selected : ${neutralImages.map(img => path.basename(img))}`);
    console.log(`Singular Image selected : ${path.basename(singularImage)}`);
})

export default router