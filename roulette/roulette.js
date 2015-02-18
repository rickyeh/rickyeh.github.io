
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
    bet : function (amount, number){
        player.bankroll = player.bankroll - amount;
        player.betAmt = amount;
        player.betNumber = number;

        console.log('I am betting ' + amount + ' chips on ' + number + '.');
    }
};

// Object to represent the table in the roulette game
// Properties :
//     currentNum - Current number with pin on it
//     payoutAmt - amount to be paid out
// Methods:
//     spin() - The function called when wheel is spun
//     payWinner() - Finds any winning bets and pays out appropriate amount
var table = {
    currentNum : 0,
    payoutAmt: 0,
    possibleNums : [],

    spin : function (){
        console.log('Table is spun.');
        table.currentNum = table.possibleNums[Math.floor(Math.random()*table.possibleNums.length)];
        console.log('Current Number: ' + table.currentNum);
    },

    payWinner : function (betAmt){
        if (player.betNumber.toString() === this.currentNum) {
            console.log('Congratulations, you won!');
            this.payoutAmt = betAmt * 35;
            player.bankroll = player.bankroll + this.payoutAmt;
        } else {
            console.log('Sorry, try again!');
        }
        console.log(player.bankroll);
        console.log('Current Bankroll is : ' + player.bankroll);
    }
};

// MAIN PROGRAM STARTS HERE

// Form the array of possible winning numbers
table.possibleNums = ['00', '0', '1', '2'];

// Start game with 100 chips
player.bankroll = 100;
player.betAmt = 10;

// Player makes bets, subtract amount of money made
player.bet(player.betAmt, player.betNumber);

// Player hits spin button, table spins
// Randomize the current number to be one of the possible possibleNums.
table.spin();

// If player's bet number matches the currentNum, pay out the player.
    // if not, clear the board and start again
table.payWinner(player.betAmt);