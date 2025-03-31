let secretWord = "TRAIN"; 

var height = 6; 
var width = 5;

let initialise(){
    let grid = document.getElementById('grid');
    for (let r=0; r < height; r++) {
        for (let c = 0; c < width; c ++) {
            let tile = document.createElement('span'); 
            tile.classList.add('tile');
            grid.appendChild(tile);
            console.log(tile);
        }
    }
};
