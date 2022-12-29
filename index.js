import layout from "./layout/layout.js";
let url = "http://localhost:3001/playlist"
let a
let b
axios.get(url)
.then(res => {
    console.log(res.data)
})
axios.get("http://localhost:3001/alboms")
.then(res => {
    console.log(res.data)
    a = res.data
    b = res.data
    reload(a.slice(0, 5))
    reloadtwo(b.slice(6, 11))
})
let body = document.querySelector('#root')
layout(body)
let cont = document.body
cont.classList.add('index')
let right = document.querySelector('.right')
let header = document.querySelector('header')
let flow = document.querySelector('.none')
let wrap = document.querySelector('.wrapper')
let grid = document.querySelector('.wrap-grid')
let section = document.querySelector('.grid')
let sectiontwo = document.querySelector('.gridtwo')
let grids = document.querySelectorAll('.grid-block')
let click = document.querySelector('.click')
let likedclick = document.querySelector('.likedclick')
let likedtext = document.querySelector('.hometext')
likedtext.style.color = '#ffffff'
likedclick.onclick = () => {
    window.location.assign('/liked/index.html')
}
grids.forEach(item => {
    item.onmouseenter = () => {
        item.firstChild.nextElementSibling.style.display = "block"
            item.firstChild.nextElementSibling.style.opacity = "1"
    }
         item.onmouseleave = () => {
	        item.firstChild.nextElementSibling.style.opacity = "0"
	        setTimeout(() => {
		        item.firstChild.nextElementSibling.style.display = null
	         }, 200);
            } 
})
flow.onclick = () => {
    right.style.display = "none"
    header.style.width = '83.5%'
    header.style.left = '16.5%'
    header.style.transform = 'translateX(0%)'
    wrap.style.width = '80%'
    wrap.style.float = 'right'
    wrap.style.margin = '110px 1.5% 0 0'
    grid.style.gridTemplateColumns = "repeat(3, 1fr)"
    section.style.gridTemplateColumns = "repeat(6, 224px)"
    section.style.gridGap = "31px"
    sectiontwo.style.gridTemplateColumns = "repeat(6, 224px)"
    sectiontwo.style.gridGap = "31px"
    body.style.height = "147vh"
    reload(a.slice(0, 6))
    reloadtwo(b.slice(6))
}
let {pathname} = window.location
pathname !== '/playlist/index.html' || '/liked/index.html' ? localStorage.removeItem('albom') : null



const reload = (arr) => {
    section.innerHTML = ""
     for(let item of arr) {
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
            }, 300);
        }
        items.onclick = () => {
            window.location.assign('./playlist/index.html')
            localStorage.setItem('albom', JSON.stringify(item))
        }
     }
 }
 const reloadtwo = (arr) => {
    sectiontwo.innerHTML = ""
     for(let item of arr) {
        let items = document.createElement('div'),
            itemImg = document.createElement('div'),
            itemPlayer = document.createElement('div'),
            itemTextBlock = document.createElement('div'),
            itemText = document.createElement('p'),
            itemText2 = document.createElement('p');

        items.classList.add('items')
        itemPlayer.classList.add('player')
        itemImg.classList.add('item-img')
        itemImg.style.backgroundImage = `url("./public/images/${item.img}.png")`  
        itemTextBlock.classList.add('item-text-block')
        itemText.classList.add('grid-text')
        itemText.innerHTML = item.artist
        itemText2.classList.add('text')
        itemText2.innerHTML = item.songs

        sectiontwo.append(items)
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
            }, 300);
        }
     }
 }