fs = require('fs');
utils = require('../utils');
let data = fs.readFileSync('input', 'utf8');
console.log('-= Data Loaded =-');

const groups = data.split('\n\n');

let sum = 0;
for( let group of groups){
    let people = group.split('\n').length;

    // This was the initial plan and I did it, but when debugging,
    // I removed this, thinking that it was the problem.
    for(let letter of 'abcdefghijklmnopqrstuvwxyz'.split('')){

        let regex = new RegExp(letter, 'g');
        if((group.match(regex) || []).length == people){
            sum += 1;
        }
    }
}
console.log(sum)