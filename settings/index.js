import layout from "../layout/layout.js";
let url = "http://localhost:3001/playlist"
let cont = document.querySelector('#root')
layout(cont)
let form = document.forms.form
let inp = document.querySelector('.inpChange')
let toggle = document.querySelector('.name_change_right')
let local = JSON.parse(localStorage.getItem('userState'))
inp.value = local ? local.username : 'davadirect3'
if(local) {
    local.change === 'on' ? toggle.innerHTML =  `
    <label class="switch">
    <input type="checkbox" class="input" name="change" checked>
    <span class="slider round"></span>
    </label>`
  : toggle.innerHTML =  `
  <label class="switch">
     <input type="checkbox" class="input" name="change">
     <span class="slider round"></span>
     </label>
  `
}
form.onsubmit = (e) => {
    e.preventDefault()

    let change = {
        change: 'off'
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        change[key] = value
    })

    localStorage.setItem('userState', JSON.stringify(change))
}