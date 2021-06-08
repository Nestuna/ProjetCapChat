import Model from '../model/Model.js'

const db = new Model()

export default class Admin {
    constructor(){
        this.username = undefined
        this.token = undefined
    }

    register = async (username, password) => {
        this.username = username
        db.addUser(username, password)
    }
}