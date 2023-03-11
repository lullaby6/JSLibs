const scrollRevealElements = document.querySelectorAll('.scroll-reveal')

const observer = new IntersectionObserver(entries =>
    entries.forEach(entry => {
        const element = entry.target

        if(entry.isIntersecting){
            if(!element.scrollReveal){
                let startAnimation = {}
                let endAnimation =  {translate: 0}

                const direction = element.getAttribute('direction') || 'top'
                const easing = element.getAttribute('easing') || 'ease-in-out'
                const duration = Number(element.getAttribute('duration')) || 1000
                const distance = Number(element.getAttribute('distance')) || 100
                if(element.hasAttribute('fade')) {
                    startAnimation.opacity = 0
                    endAnimation.opacity = 1
                }
                if(element.hasAttribute('onetime')) element.scrollReveal = true

                switch (direction) {
                    case 'bottom':
                        startAnimation.translate = `0 -${distance}%`
                        break;
                    case 'top':
                        startAnimation.translate = `0 ${distance}%`
                        break;
                    case 'right':
                        startAnimation.translate = `${distance}% 0`
                        break;
                    case 'left':
                        startAnimation.translate = `-${distance}% 0`
                        break;
                }

                element.animate([
                    startAnimation,
                    endAnimation
                ],
                {
                    duration,
                    easing,
                    fill: 'forwards'
                })
            }
        }else{
            if(!element.scrollReveal){
                const direction = element.getAttribute('direction') || 'top'
                const distance = Number(element.getAttribute('distance')) || 100
                if(element.hasAttribute('fade')) element.style.opacity = 0

                switch (direction) {
                    case 'bottom':
                        element.style.translate = `0 -${distance}%`
                        break;
                    case 'top':
                        element.style.translate = `0 ${distance}%`
                        break;
                    case 'right':
                        element.style.translate = `${distance}% 0`
                        break;
                    case 'left':
                        element.style.translate = `-${distance}% 0`
                        break;
                }
            }
        }
    })
)

scrollRevealElements.forEach(element => {
    observer.observe(element)

    const direction = element.getAttribute('direction') || 'top'
    const distance = Number(element.getAttribute('distance')) || 100
    if(element.hasAttribute('fade')) element.style.opacity = 0

    switch (direction) {
        case 'bottom':
            element.style.translate = `0 -${distance}%`
            break;
        case 'top':
            element.style.translate = `0 ${distance}%`
            break;
        case 'right':
            element.style.translate = `${distance}% 0`
            break;
        case 'left':
            element.style.translate = `-${distance}% 0`
            break;
    }
})