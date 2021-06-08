import mysql from 'mysql'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config.json')))

export default class Model {
    constructor(options) {
        this.connection = this._connect(config)
    }

    _connect = (config) => {
        const connection = mysql.createConnection(config)
        connection.connect(err => {
            if (err) throw err
            console.log('Connection to MySQL Server sucessful : ' + config.host);
        })
    }


}