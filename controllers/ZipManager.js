const fs = require('fs')
const path = require('path')
const unzipper = require('unzipper')
const model = require('../model/Model')

class ZipManager {
    unzip = async (zipFile, themeId) => {
        const outputPath = path.resolve(__dirname, `../public/images/theme/${themeId}`)
        const zipFilePath = zipFile
        const res = await this._unzipFile(zipFilePath, outputPath)

        return res
    }

    _unzipFile(inputFile, outputDir){
        return new Promise((resolve,reject) => {
            fs.createReadStream(inputFile)
                .pipe(unzipper.Extract({'path': outputDir}))
                    .on('close', () => {
                        resolve(true)
                    })
        })
    }
}

module.exports = new ZipManager()