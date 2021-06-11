const db = require('../model/Model.js')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')


class Token {
    constructor(){
        this.privateKey = fs.readFileSync(path.resolve('') + '/controllers/private-key.pem')
        this.publicKey = fs.readFileSync(path.resolve('') + '/controllers/public-key.pem')

    }

    generateToken = (userId) => {
        const token = jwt.sign(
            userId,
            this.privateKey,
            {algorithm: 'RS256'}
        )
        return token
    }

    verifyToken = (token) => {
        const decoded = jwt.verify(token, this.publicKey, {algorithms: ['RS256']})
        return decoded
    }
}

module.exports = new Token()