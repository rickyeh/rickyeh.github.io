var BLANK = 0;
var PLAYER_O = 1;
var PLAYER_X = 2;

var boardSize = 3;              // Set game board's size.  TODO: Make value changable
var currentPlayer = PLAYER_O;   // Variable to track whose turn it is - 0 for O, 1 for X
var totalTurns = 0;             // Counter to track total moves to detect tie



// Object: Represents a player in the game
// Values:
//      sign - The symbol the player is using, X or O
// Methods:
//      takeTurn() - Called on every click of a board cell to place a symbol
var Player = function Player(sign) {
    this.sign = sign;

    this.takeTurn = function(i, j) {

        // Check if spot isn't empty.  If it's occupied, kick out of method and pick another.
        if (gameBoard[i][j] !== BLANK || boardUI.isDisabled) {
            $('#box' + i + j).effect( 'shake', {distance: 2, direction: 'right'}, 300);
            return;
        } 

        totalTurns++;

        if (this.sign === 'O'){
            $('#box' + i + j).hide().html(boardUI.oString).fadeIn('fast');
            gameBoard[i][j] = PLAYER_O;
            currentPlayer = PLAYER_X;
        } else {
            gameBoard[i][j] = PLAYER_X;    
            $('#box' + i + j).hide().html(boardUI.xString).fadeIn('fast');
            currentPlayer = PLAYER_O;
        }
        if (boardUI.checkVictory(this.sign)) {
            boardUI.showEndGameMessage(this.sign);
        } else if (totalTurns === boardSize * boardSize) { 
            boardUI.showEndGameMessage('T');
        }
    };
};



// Object: Represents the board and UI
// Values:
//      oString, xString - Strings that draw the O and X symbols with inline SVG.  
//      isDisabled - Boolean flag that disables board clicks when true
// Methods:
//      createGrid(n) - Inserts the DIVs to the gameBoard via a jQuery loop
//      createClickHandlers() - Initializes all the click handlers for each board cell and button
//      resetGame() - Resets game to intial state
//      init () - Initializes the board with all zeroes
//      checkVictory() - Checks the board for victories.  Called after each successful takeTurn
//      highlightBox() - Highlights the div by adding a class. Used to show winning symbols.
//      showEndGameMessage() - Called when game ends to change title message accordingly

var boardUI = {

    oString: '<svg class="xo" height="110" width="110">' +
        '<circle cx="55" cy="55" r="43" stroke="#E43A20" stroke-width="12" fill-opacity="0" />' +
        '</svg>',

    xString: '<svg class="xo" height="100" width="100">' +
        '<line x1="10" y1="10" x2="90" y2="90" style="stroke:#00AAC4;stroke-width:12" />' +
        '<line x1="90" y1="10" x2="10" y2="90" style="stroke:#00AAC4;stroke-width:12" />' +
        '</svg>',

    isDisabled: false,

    // Double for loop to insert HTML for grid creation
    createGrid: function(n) {
        for (var i = 0; i < n; ++i) {
            for (var j = 0; j < n; ++j) {
                var boxString = '<div class="boardCell" id="box' + i + j + '"></div>';
                $('#gameBoard').append(boxString);
            }
        }
    },

    createClickHandlers: function() {
        // Create anonymous function to pass in the i to create closure
        function createAnonFunction(i, j) {
            var actionOnClick = function() {
                if (currentPlayer === PLAYER_O) {
                    playerO.takeTurn(i, j);
                } else {
                    playerX.takeTurn(i, j);
                }
            };
            return actionOnClick;
        }

        // Loop to initialize all board cell handlers
        for (var i = 0; i < boardSize; ++i) {
            for (var j = 0; j < boardSize; ++j) {
                $('#box' + i + j).click(createAnonFunction(i, j));
            }
        }

        // Reset button
        $('#resetButton').click(function() {
            boardUI.resetGame();
        });
    },

    resetGame: function() {

        // Disable reset function if nothing has been played yet
        if (totalTurns === 0) {
            return;
        }

        if (this.isDisabled === true) {
            $('#titleText').fadeOut('slow'); 
        }

        // De-highlight the winning boxes
        setTimeout(function() {
            $('div').removeClass('highlightBox');
        }, 1200);

        currentPlayer = PLAYER_O;
        totalTurns = 0;

        // Reset all gameboard array elements to blank
        this.init();

        // Loop through SVG elements of class .xo to fade out at random times
        $('.xo').each(function(i, el) {

            var delay = 200; // Set minimum delay value
            delay = delay + Math.random() * 500; // Add on random delay up to 500 ms

            setTimeout(function() {  // Call setTimeout to delay the fadeOut
                var fadeDelay = 400;
                fadeDelay = fadeDelay + Math.random() * 400;

                $(el).fadeOut(fadeDelay);
            }, delay);
        });

        // Remove all .xo markers on board and re-enable clickability
        setTimeout(function() {
            $('.xo').remove();
            boardUI.isDisabled = false;
        }, 1300);
    },

    // Initialize the board will all zeros
    init: function() {
        for (var i = 0; i < boardSize; i++) {
            for (var j = 0; j < boardSize; j++) {
                gameBoard[i][j] = BLANK;
            }
        }
    },

    checkVictory: function(sign) {
        var searchValue;

        if (sign === 'O') {
            searchValue = PLAYER_O;
        } else {
            searchValue = PLAYER_X;
        }

        // Loop to scan the three rows for victory
        for (var row = 0; row < boardSize; ++row) {
            var matchCount = 0;

            for (var col = 0; col < boardSize; ++col) {
                if (gameBoard[row][col] === searchValue) {
                    matchCount++;
                }
                if (matchCount === 3) {
                    boardUI.highlightBox(row,0);
                    boardUI.highlightBox(row,1);
                    boardUI.highlightBox(row,2);
                    return true;
                }
            }
        }

        // Loop to scan three columns for victory
        for (var col = 0; col < boardSize; ++col) {
            var matchCount = 0;

            for (var row = 0; row < boardSize; ++row) {
                if (gameBoard[row][col] === searchValue) {
                    matchCount++;
                }
                if (matchCount === 3) {
                    boardUI.highlightBox(0, col);
                    boardUI.highlightBox(1, col);
                    boardUI.highlightBox(2, col);
                    return true;
                }
            }
        }

        // Scan for Diagonal victory conditions
        if (gameBoard[0][0] == searchValue && gameBoard[1][1] == searchValue && gameBoard[2][2] == searchValue) {
            boardUI.highlightBox(0, 0);
            boardUI.highlightBox(1, 1);
            boardUI.highlightBox(2, 2);
            return true;
        } else if (gameBoard[0][2] == searchValue && gameBoard[1][1] == searchValue && gameBoard[2][0] == searchValue) {
            boardUI.highlightBox(0, 2);
            boardUI.highlightBox(1, 1);
            boardUI.highlightBox(2, 0);
            return true;
        } else {
            return false;
        }
    },

    highlightBox: function(row, col) {
        $('#box' + row + col).addClass('highlightBox');
    },

    showEndGameMessage: function(result) {

        boardUI.isDisabled = true;

        $('#titleText').fadeOut('slow');
        window.setTimeout(changeTitle, 610);

        function changeTitle() {
            if (result === 'T') {
                $('#titleText').html('Tie Game!');
            } else {
                $('#titleText').html(result + ' Wins!');
            }
            $('#titleText').fadeIn('slow');
        }
    },
};

// Create two player objects with constructors
var playerX = new Player('X');
var playerO = new Player('O');

var gameBoard = new Array(boardSize);

// Create 2D Array based on board size
for (var i = 0; i < boardSize; i++) {
    gameBoard[i] = new Array(boardSize);
}

// Main function to load the page with desired board size.
$(document).ready(function() {
    // Initialize board UI
    boardUI.init();

    boardUI.createGrid(boardSize);
    boardUI.createClickHandlers();
});

