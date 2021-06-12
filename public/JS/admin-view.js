
export default class AdminView {
    constructor(userId) {
        this.userId = userId
        this.themes_container = document.getElementById('themes')
        this.token = window.localStorage.getItem('token')
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + this.token
        }
        this.fileFormContainer = document.getElementById('file_form')
        this.init()
    }

    init = () => {
        this.onSubmitTheme()
    }
    onSubmitTheme = () => {
        const btn = document.getElementById('theme_add_btn')
        btn.addEventListener('click', () => {
            const themeName = document.getElementById('theme_name').value
            this._addTheme(themeName)
                .then(theme => {
                    const fileForm = `<form ref='uploadForm'
                                        id='uploadForm'
                                        action='http://localhost:3000/admin/images?themeId=${theme.themeId}&token=${this.token}'
                                        method='post'
                                        encType="multipart/form-data">
                                            <input type="file" name="themeFiles" id="file_input">
                                            <input type='submit' value='Upload!' />
                                      </form>`
                    this.fileFormContainer.innerHTML = fileForm

                })
                .catch(err => console.error(err))
        })
    }

    _addTheme = async (themeName) => {
        const res = await fetch('/admin/themes', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                themeName: themeName,
                userId: this.userId,
            }),
        })

        return (res.status === 200 ? res.json() : false)
    }
}