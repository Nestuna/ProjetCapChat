import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
import homeRoute from './routes/home.js'

app.use('/', homeRoute)

app.listen('3000', () => console.log('Server lauched on port 3000'))
