import mysql from 'mysql'
import bcrypt from 'bcrypt'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config.json')))

export default class Model {
    constructor(options) {
        this.db = this._connect(config)
    }

    _connect = (config) => {
        const connection = mysql.createConnection(config)
        connection.connect(err => {
            if (err) throw err
            console.log('Connection to MySQL Server sucessful : ' + config.host);
        })

        return connection
    }

    addUser = async (username, password) => {
        const hash_password = bcrypt.hashSync(password, 10)
        const sql = 'INSERT INTO user (username, password) VALUES(?,?)'
        this.db.query(sql, [username, hash_password], (error, result) => {
            if (error) throw error
            else {
                console.log(`Added user ${username} with id: ` + result.insertId)
                return true
            }
        })

    }


}