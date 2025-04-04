let secretWord = "TRAIN"; 

var height = 6; 
var width = 5;

function initialise() {
    let grid = document.getElementById('grid');
    for (let r=0; r < height; r++) {
        for (let c = 0; c < width; c ++) {
            let tile = document.createElement('input'); 
            tile.type = 'text';
            tile.maxLength = '1'
            tile.classList.add('tile');
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
    for (let i = 0; i < tiles.length; i++) {
        userInput += tiles[i].value.toUpperCase();
    }
    if (userInput === secretWord){
        alert(`Congratulations you are right! Todays word is ${secretWord}`)
    }
    console.log(userInput)
};

function highlight() {
    for (let i = 0; i < 5; i++) {
        if(userInput === secretWord[i]) {
            tile.classList.add('green');
        }else if(secretWord.includes(userInput)){
            tile.classList.add('yellow');
        }else {
            tile.classList.add('grey')
        }
}

window.onload = function() {
    initialise();
};