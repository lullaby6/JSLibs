const toggleThemeElements = document.querySelectorAll('.toggle-theme')
const setDarkModeElements = document.querySelectorAll('.set-darkmode')
const setLightModeElements = document.querySelectorAll('.set-lightmode')

function setTheme(theme) {
	localStorage.theme = theme
	theme === 'dark'
		? document.documentElement.classList.add('dark')
		: document.documentElement.classList.remove('dark')
    console.log(theme);
}

'theme' in localStorage
    ? setTheme(
        localStorage.theme === 'dark'
            ? 'dark'
            : 'light'
    )

    : setTheme(
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
    )

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event =>
	setTheme(
		event.matches
			? 'dark'
			: 'light'
	)
)

setDarkModeElements.forEach(element =>
    element.addEventListener('click', () => setTheme('dark'))
)

setLightModeElements.forEach(element =>
    element.addEventListener('click', () => setTheme('light'))
)

toggleThemeElements.forEach(element =>
    element.addEventListener('click', () => setTheme(
        localStorage.theme === 'dark'
            ? 'light'
            : 'dark'
    ))
)