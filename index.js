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
    if (gameTurn % 2 === 0) {
        currentPlayer = 'X';
        displayMessage("Player 0's turn");
    } else {
        currentPlayer = '0';
        displayMessage("Player X's turn");
    }

    let coordinates = extractCoordinates(input);
    board[coordinates.x][coordinates.y] = currentPlayer;

    const winningPlayer = getWinningPlayer(board);
    if (winningPlayer) {
        displayMessage(`Player ${currentPlayer} has won !`);
    }

    gameTurn += 1;
    displayBoard(board);

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
}

// this function is called whenever the user presses
// the button labeled `Generate AI coordinates`
function processAICoordinate() {
    console.log(`processAICoordinate()`);
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
            break;
        case "A2":
                return { x: 0, y: 1};
                break;            
        case "A3":
                return { x: 0, y: 2};
                break;            
        case "B1":
                return { x: 1, y: 0};
                break;            
        case "B2":
                return { x: 1, y: 1};
                break;
        case "B3":
                return { x: 1, y: 2};
                break;            
        case "C1":
                return { x: 2, y: 0};
                break;            
        case "C2":
                return { x: 2, y: 1};
                break;            
        case "C3":
                return { x: 2, y: 2};
                break;    
        default:
            break;
    }
}

// this function should return `X` or `O` or undefined (carefull it's not a string )
// based on interpreting the values in the board variable
function getWinningPlayer(board) {
    return undefined;
}