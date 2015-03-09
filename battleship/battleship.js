var response = prompt('Do you want to play battleship? Yes/No');

if (response.toLowerCase() === 'yes') {
    alert('Awesome! Let us begin!');
} else {  
    alert('Doh!  Maybe next time :( ');
}

// Object to represent player
var player = {
    shotCounter : 0,

    // Method to shoot at a guessed position.
    shootPosition: function(letter, number){
        this.shotCounter++;
        enemy.shootResponse(letter, number);
    }
};


// Object to represent enemy
var enemy = {
    numShips : 4,
    carrierHP:    5,
    battleshipHP: 4,
    cruiserHP:    3,
    destroyerHP:  2,

    // 2D Array of ships.  Manual placement for now.  Will randomize later.
    //  x =  0  1  2  3  4  5  6  
    board: [[0, 0, 0, 0, 0, 0, 0],     // y = 0
            [0, 0, 0, 0, 0, 0, 0],     // y = 1
            [0, 5, 5, 5, 5, 5, 0],     // y = 2
            [4, 0, 0, 0, 0, 0, 0],     // y = 3
            [4, 0, 0, 0, 0, 0, 0],     // y = 4
            [4, 0, 3, 3, 3, 0, 2],     // y = 5
            [4, 0, 0, 0, 0, 0, 2]],     // y = 6

    // Method to calculate whether a shot hits, and respond appropriately.
    shootResponse: function(y, x ){
        var shotValue = this.board[y][x];

        if (shotValue > 0){             // if shotValue > 0, then there is a ship.
            console.log('Hit!');
            switch (shotValue) {        // Check which type of ship it is.
                case 2:                 // Destroyer
                    this.destroyerHP--;
                    if (this.destroyerHP === 0) {
                        console.log('You sunk my destroyer!');
                        this.numShips--;
                    }
                    break;
                case 3:                 // Cruiser
                    this.cruiserHP--;
                    if (this.cruiserHP === 0) {
                        console.log('You sunk my cruiser!');
                        this.numShips--;
                    }
                    break;
                case 4:                 // Battleship
                    this.battleshipHP--;
                    if (this.battleshipHP === 0) {
                        console.log('You sunk my battleship!');
                        this.numShips--;
                    }
                    break;
                case 5:                 // Carrier
                    this.carrierHP--;
                    if (this.carrierHP === 0) {
                        console.log('You sunk my carrier!');
                        this.numShips--;
                    }
                    break;
            }
            this.board[y][x] = 0;
        } else {
            console.log('Miss!');
        }

        // When number of ships is 0, game is over.
        if (this.numShips === 0){
            console.log('Congratulations, you won the game!');
            console.log('It only took you ' + player.shotCounter + ' shots!');
            alert('Congratulations, you won the game!\nIt only took you ' + player.shotCounter + ' shots!');
        }
    }
};

// Object to represent HTML Elements
var boardUI = {
    // someOutput : document.getElementbyID('someDiv');
    // shotCounterOutput : document.getElementByID('shotCounterDiv');
}