import layout from "../layout.js";
let url = "http://localhost:3001/playlist"
axios.get(url)
    .then(res => {
        music(res.data)
        console.log(res.data);
    })
axios.get("http://localhost:3001/alboms")
    .then(res => {
        console.log(res.data)
    })
let local = JSON.parse(localStorage.getItem('albom'))
let color = document.querySelector('.color')
let cont = document.querySelector('#root')
color.style.backgroundImage = `linear-gradient(180deg, ${local.background} 5.09%, #121212 43.28%)`,
    layout(cont)
let right = document.querySelector('.right')
let playlistImg = document.querySelector('.playlist-img').style.backgroundImage = `url(../img/${local.img}.jpg)`
let title = document.querySelector('.titletext').innerHTML = local.artist
let musicname = document.querySelector('.artist-name').innerHTML = local.songs
let place = document.querySelector('.musicsblock')
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
    wrap.style.float = 'right'
    wrap.style.margin = '110px 1.5% 0 0'
    wraps.style.width = '80%'
    wraps.style.left = '18.0%'
    wraps.style.transform = 'translateX(0%)'
}
let count = 0
const music = (arr) => {
    for (let item of arr) {
        if (local.artist === item.artist) {
            count++
            let wrap = document.createElement('div')
            let number = document.createElement('p')
            let play = document.createElement('div')
            let block = document.createElement('div')
            let musicimg = document.createElement('div')
            let musicblock = document.createElement('div')
            let blocktext1 = document.createElement('p')
            let blocktext2 = document.createElement('p')
            let blockalbum = document.createElement('p')
            let musicdate = document.createElement('p')
            let likedblock = document.createElement('div')
            let timeblock = document.createElement('p')

            wrap.classList.add('musicitem')
            number.classList.add('musicnumber')
            play.classList.add('play')
            number.innerHTML = count
            block.classList.add('musicblock')
            musicimg.classList.add('musicblockimg')
            musicimg.style.backgroundImage = `url('../img/${item.img}.jpg')`
            musicblock.classList.add('musicblocktext')
            blocktext1.classList.add('blocktext1')
            blocktext1.innerHTML = item.music
            blocktext2.classList.add('blocktext2')
            blocktext2.innerHTML = item.artist
            blockalbum.classList.add('musicblockalbum')
            blockalbum.innerHTML = item.albom
            musicdate.classList.add('musicdate')
            musicdate.innerHTML = item.dateadd
            likedblock.classList.add('likedblock')
            timeblock.classList.add('timeblock')
            timeblock.innerHTML = item.length

            place.append(wrap)
            wrap.append(number, play, block, blockalbum, musicdate, likedblock, timeblock)
            block.append(musicimg, musicblock)
            musicblock.append(blocktext1, blocktext2)
            wrap.onmouseenter = () => {
                likedblock.style.display = "block"
                likedblock.style.opacity = "1"
                number.style.display = "none"
                play.style.display = "block"
                play.style.opacity = "1"
            }
            likedblock.onclick = () => {
                likedblock.classList.toggle('full')
                if (likedblock.classList.contains('full')) {
                    axios.patch(url + "/" + item.id, {
                            liked: true
                        })
                        .then(res => console.log(res.data))
                } else {
                    axios.patch(url + "/" + item.id, {
                            liked: false
                        })
                        .then(res => console.log(res.data))
                }
            }
            item.liked ? likedblock.classList.add('full') : null
            wrap.onclick = () => {
                loadSong(item.music, item.artist)
            }
            wrap.onmouseleave = () => {
                likedblock.style.opacity = "0"
                play.style.opacity = "0"
                setTimeout(() => {
                    number.style.display = "block"
                    play.style.display = "none"
                    likedblock.style.display = "none"
                }, 200);
            }
        }
    }
}
let pause = document.querySelector('.pause')
let back = document.querySelector('.center-back')
let next = document.querySelector('.center-next')
let progreesBlock = document.querySelector('.footer-center-bottom')
let progress = document.querySelector('.progress')
let musictitle = document.querySelector('.musictitle')
let musicartist = document.querySelector('.musicartist')
let musicimg = document.querySelector('.musicimg')
let stop = document.querySelector('.stop')
let top = document.querySelector('.footer-center-top')
var audio = new Audio();
pause.onclick = () => {
    pause.classList.toggle('stops')
    if (pause.classList.contains('stops')) {
        Playsong()
    } else {
        Pausesong()
    }
}
let songIndex = 0



function loadSong(song, artist) {
    console.log(song);
    musictitle.innerHTML = song
    musicartist.innerHTML = artist
    musicimg.style.backgroundImage = `url("../img/${song}.jpg")`
    audio.src = `../music/${song}.mp3`;
    audio.autoplay = true
    if(audio.played) {
        pause.classList.add('stops')
    } else {
        pause.classList.remove('stops')
    }
}


function Playsong() {
    audio.play()
}

function Pausesong() {
    audio.pause()
}
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPrecent =  currentTime / duration * 100
    progress.style.width = `${progressPrecent}%`
}
audio.addEventListener('timeupdate', updateProgress)

function setProgres(e) {
    const width = this.clientWidth
    const click = e.offsetX
    const duration = audio.duration
    audio.currentTime = (click / width) * duration
}
progreesBlock.addEventListener('click', setProgres)