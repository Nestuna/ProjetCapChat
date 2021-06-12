const path = require('path')
const fs = require('fs')

class CaptchaHandler {
    constructor() {
        this.clues = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'indices.json')))
        this.singularCats = Object.keys(this.clues)
    }

    getImagesAndClue = (themeId) => {
        this.themeId = themeId
        this.base_dir = `images/theme/${themeId}`
        const data = {
            neutralImagesPaths : this.getRandomNeutralImages(themeId),
            ...this.getRandomSingularImageWithClue(themeId)
        }
        return data
    }

    getRandomNeutralImages = (themeId) => {
        const MIN = 1
        const MAX = 14
        const random_numbers = this._getRandomNumbers(MIN,MAX, 8)

        const base_dir = this.base_dir
        let files_paths = []
        for (const number of random_numbers) {
            files_paths.push(this._getImage(number))
        }

        return files_paths
    }

    getRandomSingularImageWithClue = (themeId) => {
        const MIN = 0
        const MAX = this.singularCats.length - 1
        const random_number = this._getRandomNumbers(MIN,MAX, 1)

        const base_dir = this.base_dir
        const file_path = this._getImage(random_number, true)
        const clue =  this.clues[this.singularCats[random_number]]

        return {singularImagePath: file_path, clue: clue}
    }

    _getRandomNumbers = (min, max, length) => {
        const DELTA = (max - min)
        let random_numbers = []
        let number = 0
        while (random_numbers.length < length) {
            number = Math.floor(Math.random() * DELTA) + 1;
            random_numbers.push(number)
        }
        return random_numbers
    }

    _getImage = (number, singular=false) => {
        const base_dir = this.base_dir
        let file_path = ''
        if (singular) {
            file_path = path.join(base_dir, this.singularCats[number] + '.jpg')

        } else {
            file_path = path.join(base_dir, number.toString() + '.jpg')
        }

        return file_path
    }
}

module.exports = new CaptchaHandler()