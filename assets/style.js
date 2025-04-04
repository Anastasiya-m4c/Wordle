let secretWord = "TRAIN"; 

var height = 6; 
var width = 5;

var row = 0; 
var col = 0; 

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
            tile.id = `tile${r}${col}`
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
        const key = e.key;
        if (key === 'Enter'){
            onSubmit()
            }
        }
        if (key === 'Backspace'){
            removeLetter();
        }
        if (isLetter(key)){
            addLetter(key);
        }
    };

function removeLetter() {

}   

function addLetter(){
    if ()
}
function isLetter(){
    return key.lenghth === 1 && key.match(/[a-z/i]);
}
