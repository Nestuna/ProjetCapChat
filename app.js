const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
const app = express()

const homeRoute = require('./routes/home.js')
const loginRoute = require('./routes/admin.js')

app.set('view engine', 'ejs')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(fileUpload());

app.use('/', homeRoute)
app.use('/admin', loginRoute)

app.listen('3000', () => console.log('Server lauched on port 3000'))
