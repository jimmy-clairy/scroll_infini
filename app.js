import { client_id } from './config.js'
const cardList = document.querySelector('.card-list')

const urlRandom = `https://api.unsplash.com/photos/random?client_id=${client_id}&count=10`

async function fetchAPI(url) {
    try {
        const resJSON = await fetch(url)
        if (!resJSON.ok) {
            throw new Error('Connection serveur impossible!')
        }
        return resJSON.json()
    } catch (error) {
        console.error(error);
    }
}

async function getImg(url) {
    const items = await fetchAPI(url)
    items.forEach(item => {
        const img = document.createElement('img')
        img.src = item.urls.small
        cardList.appendChild(img)
    })
}

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        getImg(urlRandom)
    }
})

observer.observe(document.querySelector('.infinite-marker'))