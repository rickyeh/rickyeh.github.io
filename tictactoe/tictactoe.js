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

var gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

var player = {
    sign: 0,
};