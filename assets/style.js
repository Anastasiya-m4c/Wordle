let secretWord = "TRAIN"; 

var height = 6; 
var width = 5;

var row = 0; 
var col = 0; 

let guessLeft = height; 
let currentGuess = [];
let nextLetter = 0; 

window.onload = function() {
    initialise();
    inputRules();
};

function initialise() {
    let grid = document.getElementById('grid');
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement('input'); 
            tile.type = 'text';
            tile.maxLength = '1';
            tile.classList.add('tile');
            tile.id = `tile${r}${c}`;
            grid.appendChild(tile);
        }
    }
};

$('#submitBtn').on('click', function () {
    onSubmit()
});

async function onSubmit() {
    //let userInput = '';
    // Loop through each tile (input box) in the current row
    //for (let t = 0; t < width; t++) {
        // Get the tile by its ID, which includes the current row and column
        //let tile = document.getElementById(`tile${row}${t}`);

        // Add the letter from the tile to the guess, in uppercase
        //userInput += tile.value.toUpperCase();
        //console.log('userInputTEST: ', userInput)
        //console.log('tile: ', tile)
    //}


    let tiles = document.querySelectorAll('.tile'); 
    let userInput = '';
    for (let i = 0; i < 5; i++) {
        console.log('TILE: ', document.getElementById(`tile${row}`))
        userInput += tiles[i].value.toUpperCase();
    }
    if (userInput === secretWord) {
        alert(`Congratulations you are right! Todays word is ${secretWord}`);
    } else if (userInput.length < 5) {
        alert('Your guess must be 5 letters.')
    } else { 
        const isValid = await isValidWord(userInput);
        if (!isValid) { 
        alert(`${userInput} is not a valid word.`);
        } else {
    highlight(userInput);
    row++; 
    col = 0;
    guessLeft--;
    console.log(guessLeft);
        }
    }   
};

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
    for (let i = 0; i < 5; i++) {
        let tile = tiles[i];
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
    if (col < width) {
        let tile = document.getElementById(`tile${row}${col}`);
        tile.value = letter;
        col++;
    }
};

function isLetter(key) {
    return key.length === 1 && key.match(/[a-zA-Z]/i);
};
