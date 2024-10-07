let deckId = ""
let ul = document.querySelector('.playersCards')
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
}

//playerDeckInitial
function playerDeck(){
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        console.log(data.cards[0].images.png)
        for(let i = 0; i < data.cards.length; i++){
        let li = document.createElement('li')
        let cardImg = document.createElement('img')
        ul.appendChild(li)
        li.appendChild(cardImg)
        cardImg.src = data.cards[i].images.png
        }
        
    })
}
// //dealer deck Initial
// function dealerDeck(){
//     let backOfCard = fetch('https://www.deckofcardsapi.com/static/img/back.png')
// }



// fetch(url)
// .then(res => res.json())
// .then(data => {
//     console.log(data)
// })