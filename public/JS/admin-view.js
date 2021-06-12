
export default class AdminView {
    constructor(userId) {
        this.userId = userId
        this.token = window.localStorage.getItem('token')
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + this.token
        }
        this.fileFormContainer = document.getElementById('file_form')
        this.themesListContainer = document.getElementById('themes_list_container')
        this.themesList = []
        this.themeSelected = window.localStorage.getItem('theme')
        this.init()
    }

    init = () => {
        this.onSubmitTheme()
        this.showThemesList()
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

    showThemesList = () => {
        let listElements = '<ul>'
        this._getThemesList()
            .then(list => {
                for (const theme of list) {
                    this.themesList.push(theme)
                    listElements += `<li class="theme-elt" id=theme_${theme.id}>${theme.name}</li>`
                }
                listElements += '</ul>'
                this.themesListContainer.innerHTML = listElements

                const themeSelected = document.querySelector(`#theme_${this.themeSelected}`)
                if (themeSelected)
                    themeSelected.classList.add('selected-theme')
                this.onSelectTheme()
            })
            .catch(err => console.error(err))
    }

    onSelectTheme = () => {
        const themeListElts = document.querySelectorAll('.theme-elt')
        console.log(themeListElts);
        for (const elt of themeListElts) {
            elt.addEventListener('click', () => {
                window.localStorage.setItem('theme', elt.id.split('_')[1])

                const className = 'selected-theme'
                const oldElementSelected = document.querySelector('.' + className)
                if (oldElementSelected)
                    oldElementSelected.classList.remove(className)
                elt.classList.add(className)
            } )
        }
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

    _getThemesList = async () => {
        const res = await fetch(`/admin/themes/list?userId=${this.userId}`, {
            method: 'GET',
            headers: this.headers
        })

        return (res.status === 200 ? res.json() : false)
    }
}