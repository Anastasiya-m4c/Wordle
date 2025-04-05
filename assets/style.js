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
};

function initialise() {
    let grid = document.getElementById('grid');
    for (let r=0; r < height; r++) {
        for (let c = 0; c < width; c ++) {
            let tile = document.createElement('input'); 
            tile.type = 'text';
            tile.maxLength = '1'
            tile.classList.add('tile');
            tile.id = `tile${r}${c}`
            grid.appendChild(tile);
        }
    }
};

$('#submitBtn').on('click', function (){
    onSubmit()
});

function onSubmit(){
    let tiles = document.querySelectorAll('.tile'); 
    let userInput = '';
    for (let i = 0; i < 5; i++) {
        userInput += tiles[i].value.toUpperCase();
    }
    if (userInput === secretWord){
        alert(`Congratulations you are right! Todays word is ${secretWord}`)
    }
    highlight(userInput);
    row ++; 
    col = 0; 
    guessLeft--;

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
    row ++; 
};    

function inputRules() {
    document.body.onkeyup = (e) => {
        const key = e.key.toUpperCase();
        if (key === 'Enter'){
            onSubmit();
        } else if (key === 'Backspace') {
            removeLetter();
        }else if (isLetter(key)){
            addLetter(key);
        }
    }
};

function removeLetter() {
    if (col > 0)
        col--;
    let tile = document.getElementById(`tile${row}${col}`)
    tile.value = '';
}   

function addLetter(){
    if (col < width) {
        let tile = document.getElementById(`tile${row}${col}`);
        tile.value = letter;
        col++;
    }
}
function isLetter(key){
    return key.length === 1 && key.match(/[a-zA-Z]/i);
};
