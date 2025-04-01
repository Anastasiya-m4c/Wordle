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

window.onload = function() {
    initialise();
};