const masonryElements = document.querySelectorAll('.masonry')

document.head.innerHTML += `
    <style>
        .masonry {
            position: relative;
            background: red;
            aspect-ratio: 1/1;
        }
        .masonry-item {
            position: absolute;
            top: 0;
            left: 0;
        }
    </style>
`

masonryElements.forEach(masonryElement => {
    const columns = masonryElement.getAttribute('columns') || 4
    let rows = 0
    const width = masonryElement.getAttribute('width') || 500
    masonryElement.style.width = `${width}px`

    const masonryItems = masonryElement.querySelectorAll('.masonry-item')
    let masonryItemsIteration = 0

    masonryItems.forEach((masonryItem, index) => {
        masonryItem.style.width = `${width/columns}px`

        if(index > 0 && index % columns == 0) {
            rows += 1
            masonryItemsIteration = 0
        }
        masonryItem.style.left = `${width/columns*masonryItemsIteration}px`
        masonryItem.style.top = `${100*rows}px`
        // masonryItem.style.top = `${masonryItems[index-(columns*rows)].clientHeight*rows}px`

        masonryItemsIteration += 1
    })
})