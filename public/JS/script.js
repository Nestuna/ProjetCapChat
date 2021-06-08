export default class Captcha {

    constructor(attempts) {
        this._init()
        this.imagesContainer = document.getElementById('images')
        this.countDownText = document.querySelector('p#countdown_text')
        this.countDown = 30
        this.attempts = 0
    }

    _init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.addEventForCaptchaImages()
            this.initCountDown()
          });
    }


    addEventForCaptchaImages() {
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

    initCountDown() {
        const penalty = this.attempts * 5
        this.countDownText.textContent = this.countDown
        let countdown = setInterval(() => {
            if (this.countDown === 0) {
                clearInterval(countdown)
                this.attempts += 1
                fetch(`/?attempts=${this.attempts}`, {
                    method: 'GET',
                    headers:{
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                    },
                 })
                this.countDown = (30 - penalty)
            }
             else {
                if (this.countDown <= 10) this.countDownText.style.color = '#ff1929'
                this.countDown -= 1
                this.countDownText.textContent = this.countDown
            }

        }, 1000)

    }

}