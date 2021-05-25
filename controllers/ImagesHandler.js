import { log } from 'console'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { readdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default class ImagesHandler {
    constructor() {
        this.singular_images = Object.keys(JSON.parse(fs.readFileSync(path.resolve(__dirname, 'indices.json'))))
    }

    getRandomNeutralImages = () => {
        const MIN = 1
        const MAX = 14
        const random_numbers = this._getRandomNumbers(MIN,MAX, 7)

        const base_dir = 'images/neutres/'
        let files_paths = []
        for (const number of random_numbers) {
            files_paths.push(this._getImage(number))
        }

        return files_paths
    }

    getRandomSingularImage = () => {
        const MIN = 0
        const MAX = 13
        const random_number = this._getRandomNumbers(MIN,MAX, 1)

        const base_dir = 'images/singuliers/'
        const file_path = this._getImage(random_number, true)
        return file_path
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
        const base_dir = singular ? 'images/singuliers/' : 'images/neutres/'
        let file_path = ''
        if (singular) {
            file_path = path.join(base_dir, this.singular_images[number] + '.jpg')

        } else {
            file_path = path.join(base_dir, number.toString() + '.jpg')
        }


        return file_path
    }
}
