// Object : Represents the player in the roulette game.
// Properties :
//     bankroll - How much money the player currently has.
//     betAmt - The amount that was bet
//     betNumber - The current bet the player has selected
// Methods:
//     bet() - Called when player makes a bet
//     clearBet() - Called after each spin by the table to clear all bets.
var player = {
    bankroll: 0,
    betAmt: 0,
    betNumber: '0',

    // Method: Sets the bet for the player of a specified amount and bet type
    // Params:
    //      amount - amount of chips that is bet
    //      number - the number or color that is bet
    bet: function(amount, number) {
        player.bankroll = player.bankroll - amount;
        player.betAmt = amount;
        player.betNumber = number;

        console.log('I am betting ' + amount + ' chips on ' + number + '.');
    },
    // Method : Clears bets and resets bet amount to zero.
    clearBet: function() {
        player.betAmt = 0;
        player.betNumber = null;
    }
};
// Object : Represents the table in the roulette game
// Properties :
//     currentNum - Current winning number with pin on it
//     payoutAmt - Amount used to calculate how much to pay out in winnings
//     numbers: - Array of possible numbers and their associated colors
// Methods:
//     spin() - Called when wheel is spun to generate a new winning number
//     payWinner() - Finds any winning bets and pays out appropriate amount
var table = {
    currentNum: {},
    payoutAmt: 0,
    numbers:   [{value:'0', color:'Green'},
                {value:'1', color:'Red'},
                {value:'2', color:'Black'},
                {value:'3', color:'Red'},
                {value:'4', color:'Black'},
                {value:'5', color:'Red'},
                {value:'6', color:'Black'},
                {value:'7', color:'Red'},
                {value:'8', color:'Black'},
                {value:'9', color:'Red'},
                {value:'10', color:'Black'},
                {value:'11', color:'Black'},
                {value:'12', color:'Red'},
                {value:'13', color:'Black'},
                {value:'14', color:'Red'},
                {value:'15', color:'Black'},
                {value:'16', color:'Red'},
                {value:'17', color:'Black'},
                {value:'18', color:'Red'},
                {value:'19', color:'Black'},
                {value:'20', color:'Black'},
                {value:'21', color:'Red'},
                {value:'22', color:'Black'},
                {value:'23', color:'Red'},
                {value:'24', color:'Black'},
                {value:'25', color:'Red'},
                {value:'26', color:'Black'},
                {value:'27', color:'Red'},
                {value:'28', color:'Red'},
                {value:'29', color:'Black'},
                {value:'30', color:'Red'},
                {value:'31', color:'Black'},
                {value:'32', color:'Red'},
                {value:'33', color:'Black'},
                {value:'34', color:'Red'},
                {value:'35', color:'Black'},
                {value:'36', color:'Red'},
                {value:'00', color:'Green'}],

    // Method : Generates a random number from the array of possible numbers and calls payWinner()
    spin: function() {
        if (player.betNumber == null) {
            console.log('Please make a bet first before spinning!');
            return;
        }

        console.log('Table is spun.');
        this.currentNum = this.numbers[Math.floor(Math.random() * this.numbers.length)];
        console.log('The winning number is: ' + this.currentNum.value + ' ' + this.currentNum.color);

        this.payWinner(player.betAmt);
        player.clearBet();
    },

    // Method: Calculates any winnings based on amount bet by comparing numbers and bets
    // params:
    //      betAmt: Amount that is bet by the player.
    payWinner: function(betAmt) {

        if (player.betNumber.toString() === this.currentNum.value) { // Number bets win 35x
            console.log('Congratulations, you won!');
            this.payoutAmt = betAmt * 35;
            player.bankroll = player.bankroll + this.payoutAmt;
        } else if (player.betNumber === 'Black' && this.currentNum.color === 'Black') { // Color bets win 2x
            console.log('Congratulations, you won!');
            this.payoutAmt = betAmt * 2;
            player.bankroll = player.bankroll + this.payoutAmt;
        } else if (player.betNumber === 'Red' && this.currentNum.color === 'Red') { // Color bets win 2x
            console.log('Congratulations, you won!');
            this.payoutAmt = betAmt * 2;
            player.bankroll = player.bankroll + this.payoutAmt;
        } else { // Nothing matches, player loses
            console.log('Sorry, try again!');
        }
        console.log(player.bankroll);
        console.log('Current Bankroll is : ' + player.bankroll);
    }
};

// Method: Starts a new game.  Resets bankroll to default value.
function newGame() {
    console.log('New game is starting...');
    player.bankroll = 100;
    player.betAmt = 0;
}
// MAIN PROGRAM STARTS HERE
newGame();

// Player makes bets, subtract amount of money made
player.bet(player.betAmt, player.betNumber);

console.log('Make bet with console command: player.bet(Amount,Number)');

// Player hits spin button, table spins
// Randomize the current number to be one of the possible numbers.
// If player's bet number matches the currentNum, pay out the player.
// if not, clear the board and start again