import { client_id } from './config.js'
const cardList = document.querySelector('.card-list')

const search = document.getElementById('search')
const form = document.querySelector('form')
let lock = false
form.addEventListener('submit', handleSubmit)
function handleSubmit(e) {
    e.preventDefault()
    lock = true
    searchValue = search.value
}

let page = 1
let searchValue = ''

async function fetchAPI(url) {
    try {
        const resJSON = await fetch(url)
        if (!resJSON.ok) {
            throw new Error('----- Connection serveur impossible! -----')
        }
        const resJS = await resJSON.json()
        console.log(resJS);
        return resJS
    } catch (error) {
        console.error(error);
    }
}

async function imgSearch() {
    const items = await fetchAPI(`https://api.unsplash.com/search/photos?page=${page}&query=${searchValue}&client_id=${client_id}`)
    items.results.forEach(item => {
        const img = document.createElement('img')
        img.src = item.urls.small
        cardList.appendChild(img)
    })
    page++
}

async function imgRandom() {
    const items = await fetchAPI(`https://api.unsplash.com/photos/random?count=10&client_id=${client_id}`)
    items.forEach(item => {
        const img = document.createElement('img')
        img.src = item.urls.small
        cardList.appendChild(img)
    })
}

async function getImg() {
    if (lock) {
        imgSearch()
    } else {
        imgRandom()
    }
}

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        getImg()
    }
})

observer.observe(document.querySelector('.infinite-marker'))