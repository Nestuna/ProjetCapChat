export default class LoginView {
    constructor() {
        this.username = undefined
        this.password = undefined
        this.text = document.getElementById('text')

        this.init()
    }

    init = () => {
        this.onSubmitLogin()
        this.onSubmitRegister()
    }

    onSubmitRegister = () => {
        const submit = document.getElementById('submit_register')

        submit.addEventListener('click', () => {
            this.username = document.getElementById('username').value
            this.password = document.getElementById('password').value
            if (!this.username || !this.password) {
                text.textContent = 'You must fill username and password'
                return
            }
            this._sendRegister(this.username, this.password)
                .then(res => {
                    if (res) {
                        window.localStorage.setItem('token', res.token)
                        console.log(`Storing token for user id : ${res.userId} `);
                        window.location.href = `?token=${res.token}`
                    } else {
                        console.error('Forbidden / Not found');
                }
                })
                .catch(err => console.log(err))
        })

    }

    _sendRegister = async (username, password) => {
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

        return res.status === 200 ? res.json() : false
    }

    onSubmitLogin = () => {
        const submit = document.getElementById('submit_login')

        submit.addEventListener('click', () => {
            this.username = document.getElementById('username').value
            this.password = document.getElementById('password').value
            if (!this.username.length || !this.password.length) {
                this.text.textContent = 'You must fill username and password'
                return
            }

            this._verifyLogin(this.username, this.password)
                .then(res => {
                    if (res) {
                        let token
                        if (res.success) {
                            token = window.localStorage.getItem('token')
                        } else {
                            token = res.token
                            window.localStorage.setItem('token',res.token )
                        }

                        window.location.href = `/admin/manage?token=${token}`

                    } else {
                        console.error('Forbidden / Not found');
                    }
                })
                .catch(err => console.log(err))
        })
    }

    _verifyLogin = async (username, password) => {
        const token = window.localStorage.getItem('token')
        const res = await fetch('/admin/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                token : token
            })
        })
        return (res.status === 200 ? res.json() : false)
    }
}