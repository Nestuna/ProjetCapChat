const express = require('express')
const path = require('path')

const homeRoute = require('./routes/home.js')
const loginRoute = require('./routes/admin.js')

const app = express()


app.set('view engine', 'ejs')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())

app.use('/', homeRoute)
app.use('/admin', loginRoute)

app.listen('3000', () => console.log('Server lauched on port 3000'))
