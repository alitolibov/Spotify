import layout from "../layout/layout.js";
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
color.style.backgroundImage = local ? `linear-gradient(180deg, ${local.background} 5.09%, #121212 43.28%)` : `linear-gradient(180deg, #3333A3 5.09%, #121212 33.4%)`
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
let playerall = document.querySelector('.biggestPlayer')
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
    let data = arr.filter(item => {
        if (local.artist === item.artist) {
            return item
        }
    })
    player(data)
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
            
            place.append(wrap)
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
                loadSong(item.music, item.artist, data)
                audio.play()
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
}

// var audio = new Audio();
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