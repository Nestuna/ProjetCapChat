import express from 'express'
import routes from './routes/routes.js'
const app = express()

app.use(express.static('public'))
app.use(routes)

app.listen('3000', () => console.log('Server lauched on port 3000'))
