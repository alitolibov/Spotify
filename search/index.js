import layout from "../layout/layout.js";
import arr from "./data/data.js";
let url = "http://localhost:3001/playlist"
function write() {
    axios.get(url)
    .then(res => {
        console.log(res.data);
        reload(res.data)
    })
}
write()
let cont = document.querySelector('#root')
cont.style.backgroundColor =  '#070707'
layout(cont)
let right = document.querySelector('.right')
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
let audio = document.querySelector('audio')
let likedclick = document.querySelector('.likedclick')
let searchblock = document.querySelector('.searchblock')
let blockFlow = document.querySelectorAll('.history__block-item-top_no')
let place = document.querySelector('.history__block__grid')
let container = document.querySelector('.containersearch')
let flow = document.querySelector('.none')
let wrap = document.querySelector('.wrapper')
let header = document.querySelector('header')
let nameImg = document.querySelector('.search')
nameImg.style.filter = 'invert(0%)'
let name = document.querySelector('.searchtext')
name.style.color = '#ffffff '
let inp = document.querySelector('.inpsearch')
let palceResults = document.querySelector('.place__results')
let local = localStorage.getItem('search')
let clickImg = document.querySelector('.musicimg')
let bigImg = document.querySelector('.footer-big-img')
let flowBtn = document.querySelector('.flowBtn')
clickImg.onclick = () => {
    clickImg.style.display = 'none'
    bigImg.style.display = 'block'
}
flowBtn.onclick = () => {
    clickImg.style.display = 'block'
    bigImg.style.display = 'none'
}

jenres(arr.slice(0, 15))
flow.onclick = () => {
    right.style.display = "none"
    header.style.width = '83.5%'
    header.style.left = '16.5%'
    header.style.transform = 'translateX(0%)'
    wrap.style.width = '80%'
    wrap.style.float = 'right'
    wrap.style.margin = '110px 1.5% 0 0'
    place.style.gridTemplateColumns = 'repeat(6, 224px)'
    place.style.gridAutoRows = '224px'
    place.style.gridGap = '31px'
    jenres(arr.slice(0))
}
searchblock.style.display = 'flex'
likedclick.onclick = () => {
    window.location.assign('../liked/index.html')
}
blockFlow.forEach(item => {
    item.onclick = () => {
        item.parentNode.parentNode.style.display = 'none'
    }
})
function jenres(data) {
    place.innerHTML = ''
    for(let item of data) {
        let block = document.createElement('div')
        block.classList.add('history__block__grid__grid-block')
        block.style.backgroundImage = `url('../public/jenres/${item.img}.png')`
        place.append(block)
    }
}
function reload(data) {
    inp.onkeyup = () => {
        if(inp.value.length !== 0) {
            container.style.display = 'none'
            palceResults.style.display = 'block'
        } else {
            container.style.display = 'block'
            palceResults.style.display = 'none'
        }
        let value = inp.value.toLowerCase().trim()
        let filtered = data.filter(item => item.music.toLowerCase().includes(value))
        reloadArr(filtered);
        localStorage.setItem('search', JSON.stringify(filtered))
    }
}
let count = 0

function reloadArr(arr) {
    palceResults.innerHTML = ''
    count = 0
    player(arr)
    for(let item of arr) {
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
            let spinner = document.createElement('div')
            let bir = document.createElement('div')
            let ikki = document.createElement('div')
            let uch = document.createElement('div')
            let turt = document.createElement('div')

            wrap.classList.add('musicitem')
            spinner.classList.add('spinner')
            bir.classList.add('bir')
            ikki.classList.add('ikki')
            uch.classList.add('uch')
            turt.classList.add('turt')
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
            
            palceResults.append(wrap)
            wrap.append(number, spinner, play, block, blockalbum, musicdate, likedblock, timeblock)
            block.append(musicimg, musicblock)
            spinner.append(bir,ikki,uch, turt)
            musicblock.append(blocktext1, blocktext2)
            wrap.onmouseenter = () => {
                likedblock.style.display = "block"
                likedblock.style.opacity = "1"
                number.style.display = "none"
                play.style.display = "block"
                play.style.opacity = "1"
            }
            wrap.onclick = () => {
                loadSong(item.music, item.artist, arr)
                audio.play()
            }
            likedblock.onclick = () => {
                likedblock.classList.toggle('full')
                if (likedblock.classList.contains('full')) {
                    axios.patch(url + "/" + item.id, {
                            liked: true
                        })
                        .then(res => console.log(res.data))
                        write()
                } else {
                    axios.patch(url + "/" + item.id, {
                            liked: false
                        })
                        .then(res => console.log(res.data))
                        write()
                }
            }
            
            wrap.onmouseleave = () => {
                !item.liked ? likedblock.style.opacity = "0" : null
                play.style.opacity = "0"
                setTimeout(() => {
                    number.style.display = "block"
                    play.style.display = "none"
                    !item.liked ? likedblock.style.display = "none" : null
                }, 200);
            }
            item.liked ? likedblock.classList.add('full') : null
    }
}
let musicount = 0
let songIndex = 0
const player = (musics) => {
    
    console.log(songIndex);

    back.onclick = () => {
        songIndex--
        if (songIndex < 0) {
            songIndex++
        }
        loadSong(musics[songIndex].music, musics[songIndex].artist, musics)
        audio.play()
    }
    next.onclick = () => {
        songIndex++
        loadSong(musics[songIndex].music, musics[songIndex].artist, musics)
        audio.play()
    }
    audio.addEventListener('ended', nextSong)

    function nextSong(e) {
        songIndex++
        loadSong(musics[songIndex].music, musics[songIndex].artist, musics)
        audio.play()
    }
    loadSong(musics[songIndex].music, musics[songIndex].artist, musics)

}
if (audio.played) {
    pause.classList.add('stops')
} else {
    pause.classList.remove('stops')
}

pause.onclick = () => {
    pause.classList.toggle('stops')
    if (pause.classList.contains('stops')) {
        Playsong()
    } else {
        Pausesong()
    }
}




async function loadSong(song, artist, music) {
    console.log(song);
    let data = music.filter(item => {
        if (item.music === song) {
            return item
        }
    })
    let block = document.querySelectorAll('.blocktext1')
    block.forEach(item => {
        if(item.innerHTML === data[0].music) {
            // item.parentNode.parentNode.parentNode.style.backgroundColor = 'red'
            // item.parentNode.parentNode.parentNode.firstChild.nextSibling.style.opacity = "1"
            // item.parentNode.parentNode.parentNode.firstChild.style.opacity = "0"
            let spinner = document.querySelectorAll('.spinner')
            spinner.forEach(items => {
                items.classList.remove('opacity')

                item.parentNode.parentNode.parentNode.firstChild.nextSibling.classList.add('opacity')
            }
            )
            let numbersblock = document.querySelectorAll('.musicnumber')
            numbersblock.forEach(items => {
                items.classList.remove('noopacity')

                item.parentNode.parentNode.parentNode.firstChild.classList.add('noopacity')
            }
            )
            let paused = document.querySelectorAll('.play')
            paused.forEach(items => {
                items.classList.remove('pausestop')

                item.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.classList.add('pausestop')
            }
            )
            let body = document.querySelectorAll('.musicitem')
            body.forEach(items => {
                items.classList.remove('white')

                item.parentNode.parentNode.parentNode.classList.add('white')
            }
            )
            let text = document.querySelectorAll('.blocktext1')
            text.forEach(items => {
                items.classList.remove('green')

                item.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.firstChild.classList.add('green')
            }
            )
        }
    })
    // console.log(block);
    musictitle.innerHTML = song
    musicartist.innerHTML = artist
    musicimg.style.backgroundImage = `url("../img/${song}.jpg")`
    bigImg.style.backgroundImage = `url("../img/${song}.jpg")`
    audio.src = `../music/${song}.mp3`;
}

function Playsong() {
    audio.play()
}

function Pausesong() {
    audio.pause()
}

function updateProgress(e) {
    const {
        duration,
        currentTime
    } = e.srcElement
    const progressPrecent = currentTime / duration * 100
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
let radius = document.querySelector('.radius')
progreesBlock.onmouseenter = () => {
    progress.classList.add('green2')
    radius.style.display = 'block'
}
progreesBlock.onmouseleave = () => {
    progress.classList.remove('green2')
    radius.style.display = 'none'
}