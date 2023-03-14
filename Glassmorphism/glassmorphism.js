document.head.innerHTML += `
    <style>
        .glassmorphism {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }
    </style>
`

const glassmorphismElements = document.querySelectorAll('.glassmorphism')

glassmorphismElements.forEach(glassmorphismElement => {
    const bg = glassmorphismElement.hasAttribute('bg') || '255, 255, 255'

    glassmorphismElement.style.backgroundColor = `rgba(${bg}, 0.3)`

    if(glassmorphismElement.hasAttribute('border')) glassmorphismElement.style.border = `1px solid rgba(${bg}, 0.3)`

    if(glassmorphismElement.hasAttribute('border-radius')) glassmorphismElement.style.borderRadius = glassmorphismElement.getAttribute('border-radius')

    if(glassmorphismElement.hasAttribute('blur')) glassmorphismElement.style.backdropFilter = `blur(${glassmorphismElement.getAttribute('blur')})`
})