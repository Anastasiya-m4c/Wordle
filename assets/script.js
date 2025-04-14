
// The secret word that the user is trying to guess
let secretWord = "TRAIN"; 

// Dimensions of the grid for the game
let height = 6; // Number of rows
const width = 5; // Number of columns

// Initial positions for guesses
let row = 0; 
let col = 0; 

let gameOver = false;
let guessLeft = height; 


// Runs when the window has finished loading
window.onload = function() {
    initialise(); // Sets up the game grid
    inputRules(); //Calls a function that sets input rules
};

// Function to create and display the input grid for the game
function initialise() {
    let grid = document.getElementById('grid');
    for (let row = 0; row <height; row++) {
        for (let col = 0; col <width; col++) {
            let tile = document.createElement('input'); 
            tile.type = 'text';
            tile.maxLength = '1';
            tile.classList.add('tile');
            tile.id = `tile${row}${col}`;
            grid.appendChild(tile);
        }
    }
};

// Event listener for the submit button click
document.getElementById('submitBtn').addEventListener('click', function () {
    if (!gameOver) {
    onSubmit()
    }
});

// Function to handle a guess submit
async function onSubmit() {
    let tiles = document.querySelectorAll('.tile'); // Get all tiles
    let userInput = ''; // String to hold the user's guess
    for (let i = 0; i < width; i++) { // Loop to collect the user's guess from the tiles
    userInput += tiles[row * width + i].value.toUpperCase(); // Access each tile of the current row
    } 
    if (guessLeft <= 0) { //check guess left before submit
        alert('No guesses left. Game over!');
        return;
    }
    if (userInput.length < width) { // Check for length
        alert('Your guess must be 5 letters.');
        return;
    } else if (userInput === secretWord) {  // Check if the user's guess matches the secret word
        alert(`Congratulations, you are right! Today's word is ${secretWord}`);
        highlight(userInput)
        gameOver = true;
        return;
    } else { 
        const isValid = await isValidWord(userInput); // Validate the word
        if (!isValid) { 
        alert(`${userInput} is not a valid word.`);
        return;
        } else {
    highlight(userInput); // Highlight tiles based on guess vs secret word

    // Stop user from editing previous guesses
    if (row >0) {
    for (let i = 0; i < width; i++) {
        tiles[row * width + i].disabled = true;
    }
}
    row++; // Move to the next row for next guess
    col = 0;
    guessLeft--; // Decrease guesses left
    console.log(guessLeft);  // Log remaining guesses
        }
        if (guessLeft <= 0) {
            alert(`Game over! Todays word is ${secretWord} Come back tomorrow for a new word.`);
            gameOver = true;
            return;
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

//function to introduce the input rules for keypresses
function inputRules() {
    document.body.onkeyup = (e) => {
        if (gameOver) 
            return; 
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

// function to remove letter 
function removeLetter() {
    if (col > 0){
        col--;
        let tile = document.getElementById(`tile${row}${col}`);
        tile.value = '';
    }
};  

//function to add letter 
function addLetter(letter) {
    if (col <width) {
        let tile = document.getElementById(`tile${row}${col}`);
        tile.value = letter;
        tile.focus();
        col++;
    }
};

//function to check if the onput is = to a letter
function isLetter(key) {
    return key.length === 1 && key.match(/[a-zA-Z]/i);
};

function disableBtn() {
    if (gameOver) {
        let btn = document.getElementById('submitBtn'); 
        btn.classList.add('disabled');
    } 
}
