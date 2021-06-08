import express from "express"
import Model from '../model/Model.js'
import Admin from '../controllers/Admin.js'

const router = express.Router()
const admin = new Admin()

router.get('/', (req, res) => {
    admin.register('test2', 'blabla')
})

export default router