import layout from "../layout/layout.js";
let url = "http://localhost:3001/playlist"
function write() {
    axios.get(url)
    .then(res => {
        console.log(res.data);
    })
}
let cont = document.querySelector('#root')
layout(cont)
