const express = require("express")
const db = require('../model/Model')
const admin = require('../controllers/AdminController')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('admin')
})
router.post('/register', (req, res) => {
    const { username, password } = req.body
    admin.register(username, password)
        .then( userId => {
            console.log(`Added user ${username} with userId: ${userId}`)
            res.status(200)
            admin.generateToken(userId)
        })
        .catch(error => console.log(`Fail to add user ${username}: ${error}`))
})

module.exports = router