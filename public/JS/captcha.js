export default class Captcha {

    constructor(attempts) {
        this._init()
        this.imagesContainer = document.getElementById('images')
        this.countDownText = document.querySelector('p#countdown_text')
        this.countDown = 30
        this.attempts = attempts
    }

    _init = () => {
        document.addEventListener('DOMContentLoaded', () => {
            this.addEventForCaptchaImages()
            this.initCountDown()
            this.getTokenAndUserId()
          });
    }


    addEventForCaptchaImages = () => {
        const images = this.imagesContainer.getElementsByClassName('capchat-img');
        const succeedText = document.createElement('p');
        for (const img of images) {
            img.addEventListener('click', () => {
                succeedText.textContent = img.id === 'singular_img' ? 'Yes !' : 'No...'
                const textContainer = document.getElementById('text')
                textContainer.appendChild(succeedText)
            });
        }
    }

    initCountDown = () => {
        const penalty = this.attempts * 5
        this.countDown = (30 - penalty)
        this.countDownText.textContent = this.countDown

        if (this.countDown === 0) {
            document.body.innerText = 'Vous avez atteint la limite de tentatives possibles !'
            document.body.style.backgroundColor = '#444'
            document.body.style.color = '#EEE'
        } else {
            let countdown = setInterval(() => {
                if (this.countDown === 0) {
                    clearInterval(countdown)
                    this.attempts += 1
                    window.location.href = `/fail?attempts=${this.attempts}`
                }
                 else {
                    if (this.countDown <= 10) {
                        this.countDownText.style.color = '#ff1929'
                    }
                    this.countDown -= 1
                    this.countDownText.textContent = this.countDown
                }
            }, 1000)
        }
    }

    getTokenAndUserId = () => {
        const token = window.localStorage.getItem('token')
        if (token) {
            const adminLink = document.getElementById('admin_link')
            adminLink.href += `?token=${token}`
        }

    }
}
