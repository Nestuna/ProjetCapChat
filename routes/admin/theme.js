const express = require("express")
const db = require('../../model/Model')
const fileManager = require('../../controllers/ZipManager')
const router = express.Router()

router.get('/', (req, res) => {

})

router.get('/list', (req, res) => {
    const { userId } = req.query
    db.getUserThemeList(userId)
        .then(themes => res.status(200).json(themes))
        .catch(err => console.error(err))
})

router.post('/', (req, res) => {
    const { themeName, userId } = req.body
    db.addTheme(themeName, userId)
        .then(themeId => {
            if (themeId) {
                res.status(200).json({themeId: themeId})
            } else {
                res.status(500)
            }
    })
})
router.put('/', (req, res) => {

})
router.delete('/', (req, res) => {

})

module.exports = router