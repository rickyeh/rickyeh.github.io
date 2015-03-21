// Number of Cards in the Deck
var numCards = 52;

// Arrays that will hold the decks of cards
var deckOne = [];
var deckTwo = [];

// Counter to reference the place in the deck
var deckOneCounter = 0;
var deckTwoCounter = 0;
var playerOneScore = 0;
var playerTwoScore = 0;

// Current card to be played
var playerOneCurrentCard;
var playerTwoCurrentCard;

// Shuffle function using the Fisher-Yates Method
function shuffleCards(array) {
    var counter = array.length;
    var temp;
    var index;

    while (counter > 0) {
        index = Math.floor(Math.random() * counter);

        counter--;

        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function getCardName(card) {
    var value = card.value;
    var suit = card.suit;

    switch (value) {
        case 11:
            value = "J";
            break;
        case 12:
            value = "Q";
            break;
        case 13:
            value = "K";
            break;
        case 1:
        case 14:
            value = "A";
            break;
    }

    switch (suit) {
        case 0:
            suit = "D";
            break;
        case 1:
            suit = "C";
            break;
        case 2:
            suit = "H";
            break;
        case 3:
            suit = "S";
            break;
    }
    return value + suit + ".png";
}

function draw() {

    var output = document.getElementById("textDisplay");
    var outputP1 = document.getElementById("playerOneDisplay");
    var outputP2 = document.getElementById("playerTwoDisplay");
    var outputP1Score = document.getElementById("playerOneScore");
    var outputP2Score = document.getElementById("playerTwoScore");

    // If game is over, cards are undefined and needs to be reset.
    if (playerOneCurrentCard === undefined) {
        reset();
    }

    console.log("Player One draws a card.");
    console.log(playerOneCurrentCard);
    outputP1.innerHTML = "<img src=/img/cards/" + getCardName(playerOneCurrentCard) + ">";

    console.log("Player Two draws a card.");
    console.log(playerTwoCurrentCard);
    outputP2.innerHTML = "<img src=/img/cards/" + getCardName(playerTwoCurrentCard) + ">";

    // Compare the Two Cards to Determine Winner
    if (playerOneCurrentCard.value > playerTwoCurrentCard.value) {
        output.innerHTML = "Player 1 Wins!";
        console.log("Player 1 Wins!");
        playerOneScore++;
        outputP1Score.innerHTML = "Score: " + playerOneScore;

    } else if (playerTwoCurrentCard.value > playerOneCurrentCard.value) {
        output.innerHTML = "Player 2 Wins!";
        console.log("Player 2 Wins!");
        playerTwoScore++;
        outputP2Score.innerHTML = "Score: " + playerTwoScore;
    } else {
        output.innerHTML = "It's a tie!";
        console.log("It's a tie!");
    }

    // Print the current Score
    console.log("The current score is: Player One: " + playerOneScore + " -  Player Two: " + playerTwoScore);
    console.log("");

    // Increment the counters of each deck
    deckOneCounter++;
    deckTwoCounter++;

    // Take the next card on the deck to be the current card
    playerOneCurrentCard = deckOne[deckOneCounter];
    playerTwoCurrentCard = deckTwo[deckTwoCounter];

    //Determine winner if last card is pulled
    if (deckOneCounter === numCards) {
        console.log("The game is over!  You're out of cards!");

        if (playerOneScore > playerTwoScore) {
            alert("Congratulations Player One, you're the Champion!");
            console.log("Congratulations Player One, you're the Champion!");
        } else if (playerTwoScore > playerOneScore) {
            console.log("Congratulations Player Two, you're the Champion!");
            alert("Congratulations Player Two, you're the Champion!");
        } else {
            console.log("Wow!  It's a tie!  Better play again!");
            alert("Wow! It's a tie!  Better play again!");
        }
    }
}

// Function to reset the game to initial state.
function reset() {

    var output = document.getElementById("textDisplay");
    var outputP1 = document.getElementById("playerOneDisplay");
    var outputP2 = document.getElementById("playerTwoDisplay");
    var outputP1Score = document.getElementById("playerOneScore");
    var outputP2Score = document.getElementById("playerTwoScore");

    output.innerHTML = "Starting New Game...<br>Shuffling Cards...<br>Reticulating Splines...";

    outputP1.innerHTML = "";
    outputP2.innerHTML = "";

    console.log("");
    console.log("Starting New Game...");
    console.log("Shuffling Cards...");
    console.log("Reticulating Splines...");
    console.log("");

    // Shuffle the cards
    shuffleCards(deckOne);
    shuffleCards(deckTwo);

    // Reset the array counter to go back to beginning of deck
    deckOneCounter = 0;
    deckTwoCounter = 0;

    // Reassign first card
    playerOneCurrentCard = deckOne[deckOneCounter];
    playerTwoCurrentCard = deckTwo[deckTwoCounter];

    // Reset the overall scores
    playerOneScore = 0;
    playerTwoScore = 0;

    outputP1Score.innerHTML = "Score: " + playerOneScore;
    outputP2Score.innerHTML = "Score: " + playerTwoScore;
}

// Function to build a deck of card objects

function deckBuilder() {
    var card = {};

    // Initialize deck with double nested for loops.  
    for (var i = 0; i <= 3; i++) {
        for (var j = 2; j <= 14; j++) {
            deckOne.push(card = {value:j, suit: i});
         }
    }

    for (i = 0; i <= 3; i++) {
        for (var j = 2; j <= 14; j++) {
            deckTwo.push(card = {value:j, suit: i});
         }
    }

    // Shuffle the cards
    shuffleCards(deckOne);
    shuffleCards(deckTwo);

    // Assign First Card on the deck
    playerOneCurrentCard = deckOne[deckOneCounter];
    playerTwoCurrentCard = deckTwo[deckTwoCounter];


}

// Function to pre load all images with jQuery so cards don't pop in slowly on first play.
function preloadImages() {

    var arrayOfValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    var arrayOfSuits = ["D", "C", "H", "S"];
    var arrayOfDeck = [];

    for (var i = 0; i < arrayOfValues.length; i++) {
        for (var j = 0; j < arrayOfSuits.length; j++) {
            arrayOfDeck.push("/img/cards/" + arrayOfValues[i] + arrayOfSuits[j] + ".png");
        }
    }

    function preload(arrayOfImages) {
        $(arrayOfImages).each(function() {
            $("<img/>")[0].src = this;
        });
    }

    preload(arrayOfDeck);
}

deckBuilder();

$(document).ready(function() {
    preloadImages();
});
