import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import Model from './model/Model.js'
import homeRoute from './routes/home.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

if (!global.model) {
    global.model = new Model()
}

app.set('view engine', 'ejs')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())

app.use('/', homeRoute)

app.listen('3000', () => console.log('Server lauched on port 3000'))
