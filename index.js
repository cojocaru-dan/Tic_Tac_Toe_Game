let gameTurn = 0;
let currentPlayer;
let board;

// this function will be called whenever the user changes
// the `select` input labeled `please select game mode`
function setGameMode(selectedValue) {
    switch (selectedValue) {
        case 'human-human':
            isPlayerXHuman = true;
            isPlayerYHuman = true;
            break;
        case 'human-ai':
            isPlayerXHuman = true;
            isPlayerYHuman = false;
            break;
    }
    resetBoard();

    setHTMLvisibilityForInputGameMode(false);
    setHTMLvisibilityForInputHumanCoordinates(true);
    setHTMLvisibilityForInputAiCoordinatesInput(false);
    setHTMLvisibilityForButtonLabeledReset(true);
    displayMessage("Player X's turn");
}

// this function is called whenever the user presses the `enter`
// key in the input box labeled `enter coordinates`
// paramerter: input - the content of the input box
function processHumanCoordinate(input) {
    console.log(`'processHumanCoordinate('${input}')`);
    // Atribute X and 0 to players. The first player is X
    if (gameTurn % 2 === 0) {
        currentPlayer = 'X';
        displayMessage("Player 0's turn");
    } else {
        currentPlayer = '0';
        displayMessage("Player X's turn");
    }

    // Check if cell is empty and display warning message 
    let coordinates = extractCoordinates(input);
    if (board[coordinates.x][coordinates.y] !== ""){
        displayMessage("Position is already taken on board")
        gameTurn += 1;
    } else {
        board[coordinates.x][coordinates.y] = currentPlayer;
    }; 

    const winningPlayer = getWinningPlayer(board);
    if (winningPlayer) {
        displayMessage(`Player ${currentPlayer} has won !`);
    }

    gameTurn += 1;
    displayBoard(board);
    document.querySelector('.coordinates > input').value = "";

    // TODO: add a message stating either
    // Player X's turn
    // Player O's turn
    // It's a tie
    // Player X won 
    // Player O won 

    // TODO: add conditions to hide the coordinates screen for 
    // the human player & show for the button to generate AI 
    // coordinates
    if (isPlayerYHuman === false && gameTurn % 2 === 1) {
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(true);
    }
    console.log(board);
}
// Display each player's turn
let displayPlayerMessage = function() {currentPlayer == "X" ? displayMessage("Player 0's turn") : displayMessage("Player X's turn")};

// this function is called whenever the user presses
// the button labeled `Generate AI coordinates`
function processAICoordinate() {
    console.log(`processAICoordinate()`);
    //Get empty cells 
    const emptyCells = [];
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            if (board[row][column] === "") {
                emptyCells.push([row, column]);
            }
        }
    }

    aiPosition = Math.floor(Math.random() * emptyCells.length);
    const [emptyRow, emptyCol] = emptyCells[aiPosition];
    board[emptyRow][emptyCol] = "0";
    currentPlayer = "X";
    displayPlayerMessage();
    gameTurn += 1;
    // Check if the next player is human (first player is human, second is AI)
    if (isPlayerXHuman && !isPlayerYHuman) {
        setHTMLvisibilityForInputHumanCoordinates(true);
        setHTMLvisibilityForInputAiCoordinatesInput(false);   
    }
    displayBoard(board);
    // extractCoordinates()
}

// this function is called when the user clicks on 
// the button labeled `Restart Game`
function resetGame() {
    resetBoard();
    displayBoard(board);
    setHTMLvisibilityForInputGameMode(true);
    setHTMLvisibilityForInputHumanCoordinates(false);
    setHTMLvisibilityForInputAiCoordinatesInput(false);
    setHTMLvisibilityForButtonLabeledReset(false);
    console.log(`resetGame()`);
    document.querySelector('.mode > select').value = "";
    document.querySelector('.coordinates > input').value = "";
    displayMessage("");
    gameTurn = 0;
}
// this function should change from A1..C3 to coordinates
// that are present in the `board` global variable
function extractCoordinates(input) {
    // this is a sample of what should be returned if the
    // the user had typed `A1`
    // you need to add the to also treat other cases (A2..C3)
    switch (input) {
        case "A1":
            return { x: 0, y: 0};
        case "A2":
            return { x: 0, y: 1};       
        case "A3":
            return { x: 0, y: 2};       
        case "B1":
            return { x: 1, y: 0};         
        case "B2":
            return { x: 1, y: 1};
        case "B3":
            return { x: 1, y: 2};        
        case "C1":
            return { x: 2, y: 0};         
        case "C2":
            return { x: 2, y: 1};         
        case "C3":
            return { x: 2, y: 2}; 
        default: displayMessage("Invalid coordinate entered ");
            break;
    }
}

// this function should return `X` or `O` or undefined (carefull it's not a string )
// based on interpreting the values in the board variable
function getWinningPlayer(board) {    
    let win = false;
    // Check win on row and reset the game 
    board.forEach(arrayOfBoard => {
        if (arrayOfBoard.every(item => item === "X")){
            displayMessage("Player X wins!");
            setHTMLvisibilityForInputHumanCoordinates(false);
            setHTMLvisibilityForButtonLabeledReset(true);
            win = true;
        } else if (arrayOfBoard.every(item => item === "0")){
            displayMessage("Player 0 wins!");
            setHTMLvisibilityForInputHumanCoordinates(false);
            setHTMLvisibilityForButtonLabeledReset(true);
            win = true;
        };
    });
    // Check win on column and reset the game 
    for (let i = 0; i < 3; i++) {
        let countXand0 = 0;
        for (let j = 0; j < 3; j++) {
            if (board[j][i] === "X"){
                countXand0 += 1;
            } else if (board[j][i] === "0"){
                countXand0 -= 1;
            }
        };
        if (countXand0 === 3){
            displayMessage("Player X wins!");
            setHTMLvisibilityForInputHumanCoordinates(false);
            setHTMLvisibilityForButtonLabeledReset(true);
            win = true;

        } else if (countXand0 === -3){
            displayMessage("Player 0 wins!");
            setHTMLvisibilityForInputHumanCoordinates(false);
            setHTMLvisibilityForButtonLabeledReset(true);
            win = true;
        }
    };

    // Check win on diagonals and reset the game
    let countOnDiagonals = 0;
    // Check diagonal left to right 
    for (let i = 0; i < 3; i++) {
        if (board[i][i] === "X"){
            countOnDiagonals += 1;
        } else if (board[i][i] === "0"){
            countOnDiagonals -= 1;
        }
    };
    // Win on first diagonal:
    if (countOnDiagonals === 3){
        displayMessage("Player X wins!");
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForButtonLabeledReset(true);
        win = true;

    } else if (countOnDiagonals === -3){
        displayMessage("Player 0 wins!");
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForButtonLabeledReset(true);
        win = true;
    }

    // Check diagonal right to left
    countOnDiagonals = 0;
    for (let i = 0; i < 3; i++) {
        if (board[i][2 - i] === "X"){
            countOnDiagonals += 1;
        } else if (board[i][2 - i] === "0"){
            countOnDiagonals -= 1;
        }
    };
    // Win on second diagonal:
    if (countOnDiagonals === 3){
        displayMessage("Player X wins!");
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForButtonLabeledReset(true);
        win = true;

    } else if (countOnDiagonals === -3){
        displayMessage("Player 0 wins!");
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForButtonLabeledReset(true);
        win = true;
    }

    // IT'S A TIE
    //Check there is no winner and that there are no more empty cells
    if (!win && !board[0].includes("") && !board[1].includes("") && !board[2].includes("")){
        displayMessage("It's a tie!");
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForButtonLabeledReset(true);
    }
};