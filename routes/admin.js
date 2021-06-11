const express = require("express")
const db = require('../model/Model')
const tokenator = require('../controllers/TokenHandler')

const router = express.Router()

const userRoute = require('./admin/user')
const themeRoute = require('./admin/theme')
const imagesRoute = require('./admin/images')

router.use('/user', userRoute)
router.use('/themes', themesRoute)
router.use('/images', imagesRoute)

router.get('/', (req, res) => {
    const userToken = req.query['token']
    if (userToken) {
        const tokenOK = tokenator.verifyToken(userToken)
        if (tokenOK) {
            const userId = tokenOK
            console.log(`Found user ${userId}`);

            db.getUser({userId: userId})
                .then(user => {
                    if (user.length > 0) {
                        res.render('admin', {username: user[0].username})
                    }
                })
                .catch(err => {
                    console.error(err);
                    res.status(500)
                })
        } else {
            res.render('login')
        }
    } else {
        res.render('login')
    }
})

router.post('/register', (req, res) => {
    const { username, password } = req.body
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