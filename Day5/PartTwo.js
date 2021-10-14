fs = require('fs');
utils = require('../utils');
let data = fs.readFileSync('input', 'utf8');
console.log('-= Data Loaded =-');


let seatIds = [];
for(let seatId of data.split('\n')){

    let highRow = 127;
    let lowRow = 0;
    let middleRow = Math.ceil((highRow + lowRow) / 2);

    let highCol = 7;
    let lowCol = 0;
    let middleCol = Math.ceil((highCol + lowCol) / 2);
    for(let x of seatId){
        if(x == 'F'){
            highRow = middleRow;
            middleRow = Math.ceil((highRow + lowRow) / 2);
        }
        if(x == 'B'){
            lowRow = middleRow;
            middleRow = Math.ceil((highRow + lowRow) / 2)
        }

        if(x == 'L'){
            highCol = middleCol;
            middleCol = Math.ceil((highCol + lowCol) / 2);
        }
        if(x == 'R'){
            lowCol = middleCol;
            middleCol = Math.ceil((highCol + lowCol) / 2)
        }


    }
    let row = Math.min(lowRow, middleRow, highRow);
    let col = Math.min(lowCol, middleCol, highCol);
    seatIds.push(row * 8 + col);
}


let pos = seatIds.sort((a, b) => {return a-b})[0];
for(let seat of seatIds.sort((a, b) => {return a-b})){
    if(seat != pos){
        console.log('My Seat #: ', pos)
        break;
    }
    pos++
}