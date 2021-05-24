import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function selectRandomNeutralImages() {
    const MIN = 1
    const MAX = 7
    const DELTA = MAX - MIN;

    let random_numbers = []
    let number = 0
    while (random_numbers.length < 7) {
        number = Math.floor(Math.random() * DELTA);
        console.log(number);
        random_numbers.push(number)
    }

    const base_dir = path.resolve(__dirname,  '../public/images/neutres/')
    const file_ext = '.jpg'
    let files_names = []
    for (const number of random_numbers) {
        files_names.push(path.resolve(base_dir, number.toString() + file_ext))
    }

    return files_names
}