import layout from "../layout.js";
let body = document.body
let cont = document.querySelector('#root')
body.classList.add('rgb')
layout(cont)
let right = document.querySelector('.right')
let header = document.querySelector('header')
let flow = document.querySelector('.none')
let wrap = document.querySelector('.wrapper')
let wraps = document.querySelector('.wrappers')
flow.onclick = () => {
    right.style.display = "none"
    header.style.width = '83.5%'
    header.style.left = '16.5%'
    header.style.transform = 'translateX(0%)'
    wrap.style.width = '80%'
    wrap.style.left = '18.0%'
    wrap.style.transform = 'translateX(0%)'
    wraps.style.width = '80%'
    wraps.style.left = '18.0%'
    wraps.style.transform = 'translateX(0%)'
}