export default class AdminView {
    constructor() {
        this.username = undefined
        this.password = undefined

        this.init()
    }

    init = () => {
        this.onSubmitLogin()
    }
    onSubmitLogin = () => {
        const submit = document.getElementById('submit_login')

        submit.addEventListener('click', () => {
            this.username = document.getElementById('username').value
            this.password = document.getElementById('password').value
            this._sendLogin(this.username, this.password)
                .then(res => {
                    window.localStorage.setItem('token', res.token)
                    console.log(`Storing token for user id : ${res.userId} `);
                    console.log(`Token: ${res.token}`);
                })
                .catch(err => console.log(err))

        })

    }
    _sendLogin = async (username, password) => {
        const res = await fetch('/admin/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        return res.status === 500 ? false: res.json()
    }

}