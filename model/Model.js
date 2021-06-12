const mysql = require('mysql')
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')
const { log } = require('console')

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

    getUser = async (username, password) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id,username, password FROM user WHERE username = "${username}"`
            console.log(sql);
            this.db.query(sql, (error, rows) => {
                if (error || !rows) reject (error)
                else if (rows.length === 0) resolve(false)
                else {
                    const hash_password = rows[0].password
                    if (bcrypt.compareSync(password, rows[0].password)) {
                        resolve(rows[0])
                    } else {
                        resolve(false)
                    }
                }
            })
        })
    }

    getTheme = async (themeId) => {
        return new Promise((resolve, reject) => {

        })
    }

    getUserThemeList = async (userId) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * from theme WHERE user_id=${userId}`
            console.log(sql)
            this.db.query(sql, (error, rows) => {
                if (error || !rows) reject(error)
                else {
                    resolve(rows)
                }
            })
        })
    }

    addTheme = async (themeName, userId) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO theme (name, user_id) VALUES("${themeName}", ${userId})`
            console.log(sql)
            this.db.query(sql, (error, rows) => {
                if (error || !rows) reject(error)
                else {
                    resolve(rows.insertId)
                }
            })
        })
    }

}
module.exports = new Model()