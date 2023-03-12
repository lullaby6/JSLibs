const draggableElements = document.querySelectorAll('.draggable')

document.head.innerHTML += `
    <style>
        .draggable {
            position: relative;
            cursor: grab;
            user-select: none;
        }
    </style>
`

window.addEventListener('mouseup', event => {
    draggableElements.forEach(element => {
        if(element.dragging) {
            element.dragging = false
            element.style.cursor = 'grab'
        }
    })
})

function getOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

window.addEventListener('mousemove', event => {
    draggableElements.forEach(element => {
        if(element.dragging) {
            element.style.left = `${event.pageX - element.dragOffset.left - element.dragOffsetClick.left}px`
            element.style.top = `${event.pageY - element.dragOffset.top - element.dragOffsetClick.top}px`
        }
    })
})

draggableElements.forEach(element => {
    element.dragOffset = getOffset(element)
    element.addEventListener('mousedown', event => {
        element.dragging = true
        element.dragOffsetClick = {
            left: event.pageX - getOffset(element).left,
            top: event.pageY - getOffset(element).top
        }
        element.style.cursor = 'grabbing'
    })
})