// Array of daily words
const dailyWords = [
    "APPLE", "GRAPE", "TABLE", "STONE", "FLAME",
    "WATER", "PLANT", "SMILE", "DANCE", "WATCH",
    "CLOUD", "DREAM", "CHAIR", "LUNCH", "LIGHT",
    "HAPPY", "BEACH", "TIGER", "PIZZA", "VOCAL",
    "GUITAR", "FLUTE", "NIGHT", "RIVER", "EARTH",
    "PIANO", "MAGIC", "GLOVE", "PEACE", "GHOST"
];

//Code used from chat GPT to change word daily.
// Use date-based indexing to pick the daily word
const today = new Date();
const startDate = new Date(today.getFullYear(), 0, 0); // Jan 1 of the current year
const diffInTime = today - startDate; // Difference in milliseconds
const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24)); // Convert to days
const secretWord = dailyWords[diffInDays % dailyWords.length]; // Pick word based on the day

//console.log(secretWord); // This will log today's word


// Dimensions of the grid for the game
let height = 6; // Number of rows
const width = 5; // Number of columns

// Initial positions for guesses and game state
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
            tile.setAttribute('aria-label', 'letter input tile');
            grid.appendChild(tile);
        }
    }
    setRowActive(row);
}

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
document.getElementById('submitBtn').addEventListener('click', function() {
    if (!gameOver) {
        onSubmit()
    }
});

// Function to handle a guess submit
async function onSubmit() {
    let tiles = document.querySelectorAll('.tile'); // Get all tiles
    let userInput = ''; // String to hold the user's guess
    for (i = 0; i < width; i++) { // Loop to collect the user's guess from the tiles
        userInput += tiles[row * width + i].value.toUpperCase(); // Access each tile of the current row
    }
    if (userInput.length < width) { // Check for length
        showBootstrapModal("This is a 5-letter word game. Not 4. Not 6. Just... 5. Wild concept.");
        return;
    } else if (userInput === secretWord) { // Check if the user's guess matches the secret word
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
            for (r = 0; r < row; r++) {
                for (c = 0; c < width; c++) {
                    tiles[r * width + c].disabled = true;
                }
            }
            row++; // Move to the next row for next guess
            col = 0;
            guessLeft--; // Decrease guesses left
            setRowActive(row);
            console.log(guessLeft); // Log remaining guesses
        }
        if (guessLeft <= 0) {
            showBootstrapModal(getRandomOutOfGuessesMessage(secretWord));
            gameOver = true;
            disableBtn();
            return;
        }
    }
}

// Function to check if word is valid
async function isValidWord(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
        if (response.ok) {
            return true;
        } else {
            if (response.status === 404) {
                console.log('User entered invalid word')
                return false;
                } else {
                    return false; 
                }
            }
    } catch (error) {
        console.error("API error:", error);
        return false;
    }
}

// Function to highlight the tiles based on the user's guess
function highlight(userInput) {
    let tiles = document.querySelectorAll('.tile');
    for (i = 0; i < width; i++) {
        let tile = tiles[row * width + i];
        if (userInput[i] === secretWord[i]) {
            tile.classList.add('green');
        } else if (secretWord.includes(userInput[i])) {
            tile.classList.add('yellow');
        } else {
            tile.classList.add('gray');
        }
    }
}

//function to introduce the input rules for keypresses
function inputRules() {
    document.body.onkeyup = (e) => {
        if (gameOver) {
            return;
        }
        const key = e.key.toUpperCase();
        if (key === 'ENTER') {
            onSubmit();
        } else if (key === 'BACKSPACE') {
            removeLetter();
        } else if (isLetter(key)) {
            addLetter(key);
        }
    }
}

// function to remove letter 
function removeLetter() {
    if (col > 0) {
        col--;
        let tile = document.getElementById(`tile${row}${col}`);
        tile.value = '';
        tile.focus();
    }
}

//function to add letter 
function addLetter(letter) {
    if (col < width) {
        let tile = document.getElementById(`tile${row}${col}`);
        tile.value = letter;
        tile.focus();
        col++;
        //automatically focus the next tile if available
        if (col < width) {
            document.getElementById(`tile${row}${col}`)?.focus();
        }
    }
}

//function to check if the input is = to a letter
function isLetter(key) {
    return key.length === 1 && key.match(/[a-zA-Z]/i);
}

function disableBtn() {
    if (gameOver) {
        let btn = document.getElementById('submitBtn');
        btn.classList.add('disabled');
    }
}

function getRandomCongratsMessage(secretWord) {
    const randomIndex = Math.floor(Math.random() * congratsMessages.length);
    return congratsMessages[randomIndex](secretWord);
}

function getRandomOutOfGuessesMessage(secretWord) {
    const index = Math.floor(Math.random() * outOfGuessesMessages.length);
    return outOfGuessesMessages[index](secretWord);
}


//function that enables boostrtap modal and inserts a random message
function showBootstrapModal(message) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = message;
    const myModal = new bootstrap.Modal(document.getElementById('gameModal'));
    myModal.show();
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

const outOfGuessesMessages = [
    (word) => `No more guesses. The word was "${word}". But hey, at least you looked cool trying.`,
    (word) => `"${word}" was the word. And no, typing angrily doesn’t count as strategy.`,
    (word) => `That’s all 6. The word was "${word}". Consider yourself alphabetically humbled.`,
    (word) => `Out of guesses! The word was "${word}". Somewhere, a dictionary just sighed.`,
];

