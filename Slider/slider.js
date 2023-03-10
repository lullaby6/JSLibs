const sliders = document.querySelectorAll('.slider')

document.head.innerHTML += `
    <style>
        .slider {
            position: relative;
        }

        .slider-item {
            position: absolute;
            left: 0;
            top: 0;
        }
    </style>
`

sliders.forEach(slider => {
    slider.index = Number(slider.getAttribute('index')) || 0
    slider.lastIndex = slider.index

    slider.style.aspectRatio = slider.getAttribute('aspect-ration') || '16/9'
    slider.style.overflow = slider.getAttribute('overflow') || 'hidden'

    slider.animation = slider.getAttribute('animation') || 'slide'
    slider.animationDuration = Number(slider.getAttribute('animation-duration')) || 1000
    slider.animationEasing = slider.getAttribute('animation-easing') || 'ease-in-out'
    slider.animationTimeout = null

    slider.sliderItems = slider.querySelectorAll('.slider-item')
    slider.sliderItems.forEach((sliderItem, index) => {
        sliderItem.style.width = getComputedStyle(slider).width
        if(slider.index != index){
            switch(slider.animation){
                case 'slide':
                    sliderItem.style.left = `${getComputedStyle(slider).width}`
                    break
                case 'fade':
                    sliderItem.style.opacity = `0`
                    break
                case 'pull':
                    sliderItem.style.zIndex = 0
                    break
                case 'push':
                    sliderItem.style.left = `${getComputedStyle(slider).width}`
                    sliderItem.style.zIndex = '0'
                    break
                case 'scale':
                    sliderItem.style.scale = '0'
                    sliderItem.style.zIndex = '0'
                    break
            }
        }else{
            switch(slider.animation){
                case 'pull':
                    sliderItem.style.zIndex = 10
                    break
                case 'pull':
                    sliderItem.style.zIndex = 10
                    break
                case 'scale':
                    sliderItem.style.zIndex = 10
                    break
            }
        }
    })

    slider.next = () => {
        if(slider.animationTimeout == null){
            slider.lastIndex = slider.index
            slider.index += 1
            if(slider.index >= slider.sliderItems.length) slider.index = 0

            switch(slider.animation){
                case 'slide':
                    slider.lastIndexAnimation = [
                        {left: `0`},
                        {left: `-${getComputedStyle(slider).width}`}
                    ]
                    slider.indexAnimation = [
                        {left: `${getComputedStyle(slider).width}`},
                        {left: '0'}
                    ]
                    break
                case 'fade':
                    slider.lastIndexAnimation = [
                        {opacity: '1'},
                        {opacity: '0'}
                    ]
                    slider.indexAnimation = [
                        {opacity: '0'},
                        {opacity: '1'}
                    ]
                    break
                case 'pull':
                    slider.lastIndexAnimation = [
                        {left: `0`},
                        {left: `-${getComputedStyle(slider).width}`}
                    ]
                    slider.indexAnimation = [
                        {left: '0', zIndex: 0},
                        {left: '0', zIndex: 10}
                    ]
                    break
                case 'push':
                    slider.lastIndexAnimation = [
                        {zIndex: 0},
                        {zIndex: 0}
                    ]
                    slider.indexAnimation = [
                        {left: `${getComputedStyle(slider).width}`, zIndex: 0},
                        {left: '0', zIndex: 10}
                    ]
                    break
                case 'scale':
                    slider.lastIndexAnimation = [
                        {zIndex: 10},
                        {zIndex: 0}
                    ]
                    slider.indexAnimation = [
                        {scale: 0, zIndex: 0},
                        {scale: 1, zIndex: 10}
                    ]
                    break
            }
            slider.runAnimation()
        }
    }

    slider.previous = () => {
        if(slider.animationTimeout == null){
            slider.lastIndex = slider.index
            slider.index -= 1
            if(slider.index < 0) slider.index = slider.sliderItems.length-1

            switch(slider.animation){
                case 'slide':
                    slider.lastIndexAnimation = [
                        {left: `0`},
                        {left: `${getComputedStyle(slider).width}`}
                    ]
                    slider.indexAnimation = [
                        {left: `-${getComputedStyle(slider).width}`},
                        {left: '0'}
                    ]
                    break
                case 'fade':
                    slider.lastIndexAnimation = [
                        {opacity: '1'},
                        {opacity: '0'}
                    ]
                    slider.indexAnimation = [
                        {opacity: '0'},
                        {opacity: '1'}
                    ]
                    break
                case 'pull':
                    slider.lastIndexAnimation = [
                        {left: `0`},
                        {left: `${getComputedStyle(slider).width}`}
                    ]
                    slider.indexAnimation = [
                        {left: '0', zIndex: 0},
                        {left: '0', zIndex: 10}
                    ]
                    break
                case 'push':
                    slider.lastIndexAnimation = [
                        {zIndex: 0},
                        {zIndex: 0}
                    ]
                    slider.indexAnimation = [
                        {left: `-${getComputedStyle(slider).width}`, zIndex: 0},
                        {left: '0', zIndex: 10}
                    ]
                    break
                case 'scale':
                    slider.lastIndexAnimation = [
                        {scale: 1},
                        {scale: 0}
                    ]
                    slider.indexAnimation = [
                        {scale: 0},
                        {scale: 1}
                    ]
                    break
            }
            slider.runAnimation()
        }
    }

    slider.runAnimation = () => {
        slider.sliderItems[slider.lastIndex].animate(
            slider.lastIndexAnimation ,{
            duration: slider.animationDuration,
            easing: slider.animationEasing,
            fill: 'forwards'
        })

        slider.sliderItems[slider.index].animate(
            slider.indexAnimation, {
            duration: slider.animationDuration,
            easing: slider.animationEasing,
            fill: 'forwards'
        })

        slider.animationTimeout = setTimeout(() => {
            slider.animationTimeout = null
        }, slider.animationDuration)
    }

    //autoplay
    slider.autoplayDelay = Number(slider.getAttribute('autoplay-delay')) || 2000

    slider.autoplay = () => {
        slider.autoplayTimeout = setTimeout(() => {
            slider.next()

            slider.autoplay()

        }, slider.autoplayDelay)
    }
    if(slider.hasAttribute('autoplay')) slider.autoplay()

    //click
    if(slider.hasAttribute('click')) slider.addEventListener('click', () => {
        slider.next()
    })
})