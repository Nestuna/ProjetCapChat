const mysql = require('mysql')
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config.json')))
class Model {
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
        return new Promise((resolve, reject) => {
            const hash_password = bcrypt.hashSync(password, 10)
            const sql = 'INSERT INTO user (username, password) VALUES(?,?)'
            this.db.query(sql, [username, hash_password],
                (error, rows) => {
                    if (error || !rows) reject(error)
                    else {
                        resolve(rows)
                }
            })
        })

    }
}
module.exports = new Model()