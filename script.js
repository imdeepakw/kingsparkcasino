document.querySelector('.playGame').addEventListener('click', playGame)
document.querySelector('.hitCard').addEventListener('click', getCard)


let deckId = ""
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
        let total = 0 
        console.log(data.cards[0].value)
        let ulPlayer = document.querySelector('.playersCards')
        for(let i = 0; i < data.cards.length; i++){
            let li = document.createElement('li')
            let cardImg = document.createElement('img')
            ulPlayer.appendChild(li)
            li.appendChild(cardImg)
            cardImg.src = data.cards[i].images.png
            if(data.cards[i].value === "JACK" || data.cards[i].value === "QUEEN" || data.cards[i].value === "KING" || data.cards[i].value === "ACE"){
                console.log(data.cards[i].value)
                total += 10
            }else{
                total += Number(data.cards[i].value)
            }
        }
        document.querySelector('.playerTotal').innerText = total
    })
}
//When the user clicks play game, this function runs and the dealer draws one card faced down and another face up. 
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

function getCard(){
    //This function should fetch one card and add it to the UL deck of cards, also add the value of the card to the previous total

    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let span = document.querySelector('.playerTotal')
        let total = Number(span.textContent)
        console.log(total)
        let ulPlayer = document.querySelector('.playersCards')
        let li = document.createElement('li')
        let newCard = document.createElement('img')
        newCard.src = data.cards[0].images.png
        ulPlayer.appendChild(li)
        li.appendChild(newCard)
    })
}