import layout from "./layout.js";
let url = "http://localhost:3001/playlist"
axios.get(url)
.then(res => {
    console.log(res.data)
})
axios.get("http://localhost:3001/alboms")
.then(res => {
    console.log(res.data)
    reload(res.data)
})
let body = document.querySelector('#root')
layout(body)
let right = document.querySelector('.right')
let header = document.querySelector('header')
let flow = document.querySelector('.none')
let wrap = document.querySelector('.wrapper')
let grid = document.querySelector('.wrap-grid')
let section = document.querySelector('.grid')

flow.onclick = () => {
    right.style.display = "none"
    header.style.width = '83.5%'
    header.style.left = '16.5%'
    header.style.transform = 'translateX(0%)'
    wrap.style.width = '80%'
    wrap.style.left = '18.0%'
    wrap.style.transform = 'translateX(0%)'
    grid.style.gridTemplateColumns = "repeat(3, 1fr)"
}



const reload = (arr) => {
     for(let item of arr.slice(0, 5)) {
        let items = document.createElement('div'),
            itemImg = document.createElement('div'),
            itemPlayer = document.createElement('div'),
            itemTextBlock = document.createElement('div'),
            itemText = document.createElement('p'),
            itemText2 = document.createElement('p');

        items.classList.add('items')
        itemPlayer.classList.add('player')
        itemImg.classList.add('item-img')
        itemImg.style.backgroundImage = `url("./img/${item.img}.jpg")`  
        itemTextBlock.classList.add('item-text-block')
        itemText.classList.add('grid-text')
        itemText.innerHTML = item.artist
        itemText2.classList.add('text')
        itemText2.innerHTML = item.songs
        section.append(items)
        items.append(itemImg, itemTextBlock)
        itemImg.append(itemPlayer)
        itemTextBlock.append(itemText, itemText2)

        items.onmouseenter = () => {
            items.style.backgroundColor = "#282828"
            itemPlayer.style.display = "block"
            setTimeout(() => {
                itemPlayer.style.opacity = "1"
            }, 100);
        }
        items.onmouseleave = () => {
            items.style.backgroundColor = null
            itemPlayer.style.opacity = "0"
            setTimeout(() => {
                itemPlayer.style.display = null
            }, 500);
        }
     }
 }