const express = require("express")
const db = require('../model/Model')
const tokenator = require('../controllers/TokenHandler')

const router = express.Router()

const userRoute = require('./admin/user')
const themesRoute = require('./admin/theme')
const imagesRoute = require('./admin/images')
const { param } = require("./home")

router.use('/user', userRoute)
router.use('/themes', themesRoute)
router.use('/images', imagesRoute)

let userId
let username

router.use((req, res, next) => {
    let userToken = undefined
    if (req.header('Authorization')){
        userToken = req.header('Authorization').split(' ')[1]
    } else if (req.path = '/manage') {
        userToken = req.query['token']
    }
    console.log(userToken);
    const tokenOK = userToken ? tokenator.verifyToken(userToken): false
    if (tokenOK) {
        req.userId = tokenOK
        req.token = userToken
        next()
    } else {
        exceptRoutes = ['/login', '/register']
        if(exceptRoutes.includes(req.path)){
            req.token = userToken
            next()
        } else {
            res.status(403).render('login');
        }

    }
})

router.get('/', (req, res) => {
    res.render('login')
})


router.get('/manage' , (req, res) => {
    console.log('Token : ' , req.token);
    res.render('admin', {userId: req.userId, token: req.token}, (err,html) => {
        res.send(html)
    })
})

router.post('/login', (req, res) => {
    username = req.body.username
    const { password, token } = req.body
    db.getUser(username, password)
        .then(user => {
            if (user) {
                if (token) {
                    res.status(200).json({success: true})
                } else {
                    console.log(user);
                    const token = tokenator.generateToken(user.id)
                    res.status(200).json({
                        success : false,
                        token: token
                    })

                }
            } else {
                res.status(400).json({success: false})
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(({success: false}))
        })
})

router.post('/register', (req, res) => {
    username = req.body.username
    const { password } = req.body
    console.log(`Adding user: ${username}`);
    db.addUser(username, password)
        .then( userId => {
            console.log(`Added user ${username} with userId: ${userId}`)
            const token = tokenator.generateToken(userId)
            res.status(200).json({
                userId: userId,
                token: token
            })
        })
        .catch(error => {
            console.log(`Failed to add user ${username}`)
            res.status(500).json(error)
        })
})


module.exports = router