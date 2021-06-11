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
                        resolve(rows.insertId)
                }
            })
        })

    }

    getUser = async (userObj) => {
        return new Promise((resolve, reject) => {
            let sql
            if (userObj.userId) {
                sql = `SELECT username FROM user WHERE id = ${userObj.userId}`
                console.log(sql);
            } else if (userObj.username) {
                sql = `SELECT username FROM user WHERE username = ${userObj.username}`
            } else {
                console.error('Failed to get user : no argument provided');
                return false
            }

            this.db.query(sql, (error, rows) => {
                if (error) reject (error)
                else if (!rows) resolve(false)
                else resolve(rows)
            })
        })
    }
}
module.exports = new Model()