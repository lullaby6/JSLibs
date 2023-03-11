window.addEventListener('mousemove', event => {
    const mouseParallaxElements = document.querySelectorAll('.mouse-parallax')

	mouseParallaxElements.forEach(element => {
        const strength = element.getAttribute('strength') || 1
		const x = (event.clientX * strength) / 250
		const y = (event.clientY * strength) / 250
		element.style.translate = `${x}px ${y}px`
    })
})