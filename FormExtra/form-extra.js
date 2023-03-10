const formExtraElements = document.querySelectorAll('.form-extra')

formExtraElements.forEach(element => element.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    const url = event.target.action
    const method = event.target.getAttribute('method')

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    if(event.target.hasAttribute('authentication')){
        headers['Authentication'] = event.target.getAttribute('authentication')
    }

    if(event.target.hasAttribute('authorization')){
        headers['Authorization'] = event.target.getAttribute('authorization')
    }

    if(event.target.hasAttribute('headers')){
        headers = {...headers, ...JSON.parse(event.target.getAttribute('headers'))}
    }

    const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formProps)
    })
    const data = await res.json()

    if(event.target.hasAttribute('logs')) console.log(data)
    if(event.target.hasAttribute('storage')) localStorage.setItem(event.target.getAttribute('storage'), data)
}))