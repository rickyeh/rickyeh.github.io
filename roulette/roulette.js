
// player Object to represent the player in the roulette game.
// Properties :
//     bankroll - How much money the player currently has.
//     betAmt - The amount that was bet
// Methods:
//     bet() - The function that is called when player makes a bet
var player = {
    bankroll : 0,
    betAmt : 0,
    betNumber : 0,

    // Main betting function.
    // Params:
    //      amount - amount of chips that is bet
    //      number - the number that is bet on
    bet : function bet(amount, number){
        player.bankroll = player.bankroll - amount;
        player.betAmt = amount;
        player.betNumber = number;

        console.log("I am betting " + amount + " chips on " + number + ".");
    }
}

// Object to represent the table in the roulette game
// Properties :
//     currentNum - Current number with pin on it
//     payoutAmt - amount to be paid out
// Methods:
//     spin() - The function called when wheel is spun
//     payWinner() - Finds any winning bets and pays out appropriate amount
var rTable = {
    currentNum : 0,
    payoutAmt: 0,
    possibleNums : [],

    spin : function spin(){
        console.log("Table is spun.");
        rTable.currentNum = rTable.possibleNums[Math.floor(Math.random()*rTable.possibleNums.length)];
        console.log("Current Number: " + rTable.currentNum);
    },

    payWinner : function payWinner(){
        
    }
}

// MAIN PROGRAM STARTS HERE

// Form the array of possible winning numbers
rTable.possibleNums = ['00', '0', '1', '2'];

// Start game with 100 chips
player.bankroll = 100;

// Player makes bets, subtract amount of money made
player.bet(player.betAmt, player.betNumber);

// Player hits spin button, table spins
// Randomize the current number to be one of the possible possibleNums.
rTable.spin();

// If player's bet number matches the currentNum, pay out the player.
    // if not, clear the board and start again
