let sx = 0, sy = 0
let dx = sx, dy = sy

window.addEventListener('scroll', () => {
    sx = window.pageXOffset
    sy = window.pageYOffset
})

window.requestAnimationFrame(render)

function render(){
    const li = (a, b, n) => (1 - n) * a + n * b

    dx = li(dx, sx, 0.07)
    dy = li(dy ,sy, 0.07)

    dx = Math.floor(dx * 100) / 100
    dy = Math.floor(dy * 100) / 100

    document.body.style.translate = `-${dx}px -${dy}px`

    window.requestAnimationFrame(render)
}