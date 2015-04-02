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

var Player = function Player(sign){
    this.sign = sign;

    this.takeTurn = function(i){
        var x = Math.floor(i/3);
        var y = i % 3;

        if ( gameBoard[x][y] > 0 ) {
            console.log('Spot already filled, pick something else!');
            $('#box' + i).effect( 'shake', {distance: 2, direction: 'down'}, 300);
            return;
        } 

        totalTurns++;

        if (this.sign === 'O'){
            $('#box' + i).hide().html(boardUI.oString).fadeIn('fast');
            gameBoard[x][y] = 1;
            currentPlayer++;
        } else {
            gameBoard[x][y] = 2;    
            $('#box' + i).hide().html(boardUI.xString).fadeIn('fast');
            currentPlayer--;
        }
        boardUI.checkVictory();
    };
};

var playerX = new Player('X');
var playerO = new Player('O');
                
var boardUI = {

    oString: '<svg class="xo" height="100" width="100">' +
                '<circle cx="50" cy="50" r="43" stroke="#E43A20" stroke-width="12" fill-opacity="0" />' + 
             '</svg>',

    xString: '<svg class="xo" height="100" width="100">' +
                '<line x1="10" y1="10" x2="90" y2="90" style="stroke:#00AAC4;stroke-width:12" />' +
                '<line x1="90" y1="10" x2="10" y2="90" style="stroke:#00AAC4;stroke-width:12" />' +
             '</svg>',

    createClickHandlers: function() {
        // Create anonymous function to pass in the i to create closure
        function createAnonFunction(i) {
            var actionOnClick = function() {
                if (currentPlayer === 0) {
                    playerO.takeTurn(i);
                } else {
                    playerX.takeTurn(i);
                }
            };
            return actionOnClick;
        }
                
        // Loop to initialize all click handlers
        for (var i = 0; i <= 8; ++i) {
            $('#box' + i).click(createAnonFunction(i));
        }
    },

    checkVictory: function() {

    }
};

$(document).ready(function() {
    boardUI.createClickHandlers();
});

