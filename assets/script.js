// The secret word that the user is trying to guess
let secretWord = "BONUS"; 

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
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            let tile = document.createElement('input'); 
            tile.type = 'text';
            tile.maxLength = '1';
            tile.classList.add('tile');
            tile.id = `tile${row}${col}`;
            tile.disabled = true; 
            grid.appendChild(tile);
        }
    }
    setRowActive(row);
};

//Function provided by chat GPT to enable current row for typing 
function setRowActive(rowIndex) {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        const tileRow = Math.floor(index / width); // Get the row number
        if (tileRow === rowIndex) {
            tile.disabled = false; // Enable the current row
        } else {
            tile.disabled = true; // Disable all other rows
        }
    });
}


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
        showBootstrapModal('No guesses left. Game over!');
        disableBtn();
        gameOver = true
        return;
    } else if (userInput.length < width) { // Check for length
        showBootstrapModal("This is a 5-letter word game. Not 4. Not 6. Just... 5. Wild concept.");
        return;
    } else if (userInput === secretWord) {  // Check if the user's guess matches the secret word
        highlight(userInput);
        showBootstrapModal(getRandomCongratsMessage(secretWord));
        gameOver = true;
        disableBtn();
        return;
    } else { 
        const isValid = await isValidWord(userInput); // Validate the word
        if (!isValid) { 
            showBootstrapModal(`At this point, are you guessing words or just angrily typing letters? ${userInput} is not a valid word.`);
            return;
        } else {
            highlight(userInput); // Highlight tiles based on guess vs secret word
        //for loop provided by chat gpt to disable all previous rows after the guess is made    
        for (let r = 0; r < row; r++) {
            for (let c = 0; c < width; c++) {
                tiles[r * width + c].disabled = true; 
            }
        }
        row++; // Move to the next row for next guess
        col = 0;
        guessLeft--; // Decrease guesses left
        setRowActive(row);
        console.log(guessLeft);  // Log remaining guesses
        }
        //if (guessLeft <= 0) {
        //    alert(`Game over! Todays word is ${secretWord} Come back tomorrow for a new word.`);
        //   gameOver = true;
        //    disableBtn();
        //    return;
        //}
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
    for (let i = 0; i < width; i++) {
        let tile = tiles[row * width + i];
        if (userInput[i] === secretWord[i]) {
            tile.classList.add('green');
        } else if (secretWord.includes(userInput[i])){
            tile.classList.add('yellow');
        } else {
            tile.classList.add('gray');
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
    }
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
        //automatically focus the next tile if available
        if (col < width) {
            document.getElementById(`tiles${row}${col}`)?.focus();
        }
    }
};

//function to check if the input is = to a letter
function isLetter(key) {
    return key.length === 1 && key.match(/[a-zA-Z]/i);
};

function disableBtn() {
    if (gameOver) {
        let btn = document.getElementById('submitBtn'); 
        btn.classList.add('disabled');
    } 
}

const congratsMessages = [
    (word) => `Yay! "${word}" is correct! Look at you, crushing the word game like a pro 🎉`,
    (word) => `Boom! "${word}" it is! Your keyboard deserves a high five 👏`,
    (word) => `You did it! "${word}" was the word! Somewhere, a dictionary is applauding you.`,
    (word) => `Correcto-mundo! "${word}" is the word! Someone call the Wordle Hall of Fame.`,
    (word) => `Nailed it! "${word}" is the one. We knew you had it in you (eventually 😉)`,
    (word) => `Go you! "${word}" was 100% correct. Go treat yourself to a snack. You earned it.`,
    (word) => `Winner winner vocab dinner! "${word}" is correct 🎊 Word mastery unlocked.`,
    (word) => `Yes!! "${word}" was the right word. That brain of yours? Chef’s kiss 👨‍🍳💡`,
    (word) => `Big brain alert! "${word}" was spot on. You’re kind of a word genius now.`,
    (word) => `Five letters. Zero doubts. "${word}" is right — you should put this on your résumé.`,
];

function getRandomCongratsMessage(secretWord) {
    const randomIndex = Math.floor(Math.random() * congratsMessages.length);
    return congratsMessages[randomIndex](secretWord);  
}

//function that enables boostrtap modal and inserts a random message
function showBootstrapModal(message) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = message;
    const myModal = new bootstrap.Modal(document.getElementById('gameModal'));
    myModal.show();
}  