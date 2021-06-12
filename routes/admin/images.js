const express = require("express")
const db = require('../../model/Model')
const path = require('path')
const fs = require('fs')
const zipManager = require('../../controllers/ZipManager')
const router = express.Router()


router.get('/', (req, res) => {

})

router.post('/', (req, res) => {
    let zipFile;
    let uploadPath
    const themeId = req.query['themeId']
    const token = req.query['token']
    console.log('themeId send for zip extraction: ' + themeId)

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    zipFile = req.files.themeFiles;
    tmpDir = path.resolve(__dirname, `../../public/images/tmp`)
    if (!fs.existsSync(tmpDir))
        fs.mkdirSync(tmpDir)
    uploadPath = path.resolve(tmpDir, 'images.zip')

    zipFile.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err)
        console.log('Zip download successfull to ' + uploadPath )

        zipManager.unzip(uploadPath, themeId).then(() => {
            fs.rmSync(uploadPath)
            res.status(200).redirect('/admin/manage?token=' + token)
        })

    })
})

router.delete('/', (req, res) => {

})

module.exports = router