let keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

let supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch(e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.addEventListener(wheelEvent, preventDefault, wheelOpt);
    window.addEventListener('touchmove', preventDefault, wheelOpt);
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

let pages = document.querySelectorAll('.page')

let pagesCount = pages.length

let currentPage = 0

let keyUps = [87, 38]
let keyDowns = [83, 40, 32]

function scrollUp(){
    if(window.scrollY === pages[currentPage].getBoundingClientRect().top + window.scrollY){
        if(currentPage > 0){
            currentPage -= 1
            pages[currentPage].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
    }else{
        pages[currentPage].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
}

function scrollDown(){
    if(window.scrollY === pages[currentPage].getBoundingClientRect().top + window.scrollY){
        currentPage += 1
        if(currentPage >= pagesCount) currentPage = 0
        pages[currentPage].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }else{
        pages[currentPage].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
}

if(Object.values(document.body.classList).includes('fullpage')){
    disableScroll()

    window.addEventListener('keydown', e => {
        if(keyUps.includes(e.keyCode) && currentPage > 0) scrollUp()
        if(keyDowns.includes(e.keyCode)) scrollDown()
    })

    window.addEventListener(wheelEvent, e => {
        if(e.deltaY > 0) scrollDown()
        else scrollUp()
    }, wheelOpt);

    window.addEventListener('touchmove', e => {
        console.log('touchmove');
    }, wheelOpt);
}
