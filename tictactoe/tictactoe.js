/*
    First Player starts
    Clicks a square
    Game checks for victory
        if no victory, next player's turn
    Repeat until victory or All squares filled
*/

// var boardSize = 3;
var currentPlayer = 0;  // 0 for O, 1 for X
var totalTurns = 0;     // increment after every move

var gameBoard = [[0, 0, 0],
                 [0, 0, 0],
                 [0, 0, 0]];

// var player = {
//     sign: 0,
// };

function player(sign) {
    this.sign = sign;

    function takeTurn(){
        totalTurns++;

    }
}
                
var boardUI = {

    oString: '<svg class="xo" height="100" width="100">' +
                '<circle cx="50" cy="50" r="43" stroke="#E43A20" stroke-width="12" fill-opacity="0" />' + 
             '</svg>',

    xString: '<svg class="xo" height="100" width="100">' +
                '<line x1="10" y1="10" x2="90" y2="90" style="stroke:#00AAC4;stroke-width:12" />' +
                '<line x1="90" y1="10" x2="10" y2="90" style="stroke:#00AAC4;stroke-width:12" />' +
             '</svg>',

    createClickHandlers: function() {

        // Create anonymous function to pass in the i use closure
        function createAnonFunction(i) {
            var actionOnClick = function() {
                if (currentPlayer === 0) {
                    $('#box' + i).hide().html(boardUI.oString).fadeIn('fast');
                    gameBoard[Math.floor(i/3)][i%3] = 1;
                    boardUI.checkVictory(1);
                    currentPlayer++;
                } else {
                    $('#box' + i).hide().html(boardUI.xString).fadeIn('fast');
                    gameBoard[Math.floor(i/3)][i%3] = 2;
                    boardUI.checkVictory(2);
                    currentPlayer--;
                }
            };
            return actionOnClick;
        }

                
        // Loop to initialize all click handlers
        for (var i = 0; i <= 8; ++i) {
            $('#box' + i).click(createAnonFunction(i));
        }
    },

    checkVictory: function(n) {

    }
};

$(document).ready(function() {
    boardUI.createClickHandlers();
});

