const express = require("express")
const db = require('../../model/Model')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('User page')
})
router.put('/', (req, res) => {

})
router.delete('/', (req, res) => {

})

router.get('/list', (req, res) => {

})

module.exports = router