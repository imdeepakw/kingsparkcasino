let deckId = ""
document.querySelector('.playGame').addEventListener('click', playGame)

//Getting the deck ID and saving it to local storage on pageload.
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(res => res.json())
.then(data => {
    console.log(data)
    console.log(data.deck_id)
    deckId = data.deck_id
    console.log(deckId)
    if(!localStorage.getItem('deck')){
        localStorage.setItem('deck', deckId)
    }
})

function playGame(){
    playerDeck()
    dealerDeck()
}

//playerDeckInitial
//When user hits playGame, two cards are pulled from the deck of cards api and shown to the user dynamically.
function playerDeck(){
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        console.log(data.cards[0].images.png)
        let ulPlayer = document.querySelector('.playersCards')
        for(let i = 0; i < data.cards.length; i++){
        let li = document.createElement('li')
        let cardImg = document.createElement('img')
        ulPlayer.appendChild(li)
        li.appendChild(cardImg)
        cardImg.src = data.cards[i].images.png
        }
    })
}

function dealerDeck(){
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(res => res.json())
    .then(data => {
        document.querySelector('.backOfCard').src = "https://www.deckofcardsapi.com/static/img/back.png"
        console.log(data.cards[0].images.png)
        let ulDealer = document.querySelector('.dealersCard')
        let li = document.createElement('li')
        let cardImg = document.createElement('img')
        ulDealer.appendChild(li)
        li.appendChild(cardImg)
        cardImg.src = data.cards[0].images.png
        
    })

}



// fetch(url)
// .then(res => res.json())
// .then(data => {
//     console.log(data)
// })