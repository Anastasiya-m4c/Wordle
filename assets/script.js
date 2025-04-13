
// The secret word that the user is trying to guess
let secretWord = "TRAIN"; 

// Dimensions of the grid for the game
let height = 6; // Number of rows
const width = 5; // Number of columns

// Initial positions for guesses
let row = 0; 
let col = 0; 

// Number of guesses left and current guess storage
let guessLeft = height; 
//let currentGuess = [];
//let nextLetter = 0; 

// Runs when the window has finished loading
window.onload = function() {
    initialise(); // Sets up the game grid
    inputRules(); //Calls a function that sets input rules
};

// Function to create and display the input grid for the game
function initialise() {
    let grid = document.getElementById('grid');
    for (let r = 0; r <height; r++) {
        for (let c = 0; c <width; c++) {
            let tile = document.createElement('input'); 
            tile.type = 'text';
            tile.maxLength = '1';
            tile.classList.add('tile');
            tile.id = `tile${r}${c}`;
            grid.appendChild(tile);
        }
    }
};

// Event listener for the submit button click
document.getElementById('submitBtn').addEventListener('click', function () {
    onSubmit()
});


// Function to handle a guess submit
async function onSubmit() {
    
    let tiles = document.querySelectorAll('.tile'); // Get all tiles
    console.log('row', row) // Log the current row number
    let userInput = ''; // String to hold the user's guess

     // Loop to collect the user's guess from the tiles
    for (let i = 0; i <width; i++) {

    console.log('TILE: ', document.getElementById(`tile${row}`))

    userInput += tiles[row * width + i].value.toUpperCase(); // Access each tile of the current row
    } 

    // Check if the user's guess matches the secret word
    if (userInput === secretWord) {
        alert(`Congratulations, you are right! Today's word is ${secretWord}`);
    } else if (userInput.length <width) { // Check for length
        alert('Your guess must be 5 letters.');
    } else { 
        const isValid = await isValidWord(userInput); // Validate the word
        if (!isValid) { 
        alert(`${userInput} is not a valid word.`);
        } else {
    highlight(userInput); // Highlight tiles based on guess vs secret word
    row++; // Move to the next row for next guess
    //col = 0;
    guessLeft--; // Decrease guesses left
    console.log(guessLeft);  // Log remaining guesses
        }
        if (guessLeft === 0) {
            alert('Game over! Come back tomorrow for a new word.');
        }
    }   
};

// Function to highlight the tiles based on the user's guess
async function isValidWord(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("API error:", error);
        return false; 
    }
};

function highlight(userInput) {
    let tiles = document.querySelectorAll('.tile');
    for (let i = 0; i <width; i++) {
        let tile = tiles[row * width + i];
        if(userInput[i] === secretWord[i]) {
            tile.classList.add('green');
        }else if(secretWord.includes(userInput[i])){
            tile.classList.add('yellow');
        }else {
            tile.classList.add('gray')
        }
    }
};    

function inputRules() {
    document.body.onkeyup = (e) => {
        const key = e.key.toUpperCase();
        if (key === 'ENTER'){
            onSubmit();
        } else if (key === 'BACKSPACE') {
            removeLetter();
        }else if (isLetter(key)){
            addLetter(key);
        }
    };
};

function removeLetter() {
    if (col > 0){
        col--;
        let tile = document.getElementById(`tile${row}${col}`);
        tile.value = '';
    }
};  

function addLetter(letter) {
    if (col <width) {
        let tile = document.getElementById(`tile${row}${col}`);
        tile.value = letter;
        col++;
    }
};

function isLetter(key) {
    return key.length === 1 && key.match(/[a-zA-Z]/i);
};
