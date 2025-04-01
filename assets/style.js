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
    if (userInput !== width){
        alert('Please enter a 5 letter word!')
    }

};



window.onload = function() {
    initialise();
};