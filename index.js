'use strict'

const RICK_AND_MORTY_CHARACTER_URL = 'https://rickandmortyapi.com/api/character'

const htmlBody = document.getElementById('content'),
      prevButton = document.getElementById('previous'),
      nextButton = document.getElementById('next')

let characters,
    dataStore,
    currentPageNumber = 0
    
function getCharacterDataFromAPI(URL) {
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dataStore = data
            characters = data.results 
            handleData(data)
        })
        .catch(err => {
            console.log(err)
        })
}
 
function handleData() {
    if (dataStore.info.prev === "") {
        prevButton.style.display = 'none'
    } else {
        prevButton.style.display = 'inline'
    }
    if (dataStore.info.next === dataStore.info.pages - 1) {
        nextButton.style.display = 'none'
    } else {
        nextButton.style.display = 'inline'
    }
    renderData(characters)
}

function renderData(data) {
    characters.map(character => {
        htmlBody.innerHTML += 
            `<div>
                <img src=${character.image} />
                <p>${character.name}</p>
                <p>${character.species}</p>
                <p>${character.status}</p>
                <p>${character.gender}</p>
            </div>`
    })
}

function bindPrevPageButton() {
    prevButton.addEventListener('click', prevPage)
}

function bindNextPageButton() {
    nextButton.addEventListener('click', nextPage)
}

function prevPage() {
    getCharacterDataFromAPI(dataStore.info.prev)
    htmlBody.innerHTML = ''
}

function nextPage() {
    if (currentPageNumber === 0) {
        currentPageNumber = 2
    } else {
        currentPageNumber++
    }
    getCharacterDataFromAPI(dataStore.info.next)
    htmlBody.innerHTML = ''
}

function setup() {
    bindPrevPageButton()
    bindNextPageButton()
    getCharacterDataFromAPI(RICK_AND_MORTY_CHARACTER_URL)
}

setup()
