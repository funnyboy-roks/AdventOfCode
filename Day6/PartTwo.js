fs = require('fs');
utils = require('../utils');
let data = fs.readFileSync('input', 'utf8');
console.log('-= Data Loaded =-');

const groups = data.split('\n\n');

let sum = 0;
for( let group of groups){

    let questions = group.replace(/\n/g, '');
    let people = group.split('\n').length;
console.log(group);

    let out = {}
    for(let letter of 'abcdefghijklmnopqrstuvwxyz'.split('')){
        // let regex = new RegExp(letter, 'g');
        // if((group.match(regex) || []).length == people){
        //     sum += 1;
        // }
        out[letter] =  0;
    }
    for(let x of questions){
        out[x]++;
    }
    for(let letter of 'abcdefghijklmnopqrstuvwxyz'.split('')){
        if(out[letter] == people){
            sum += 1;
        }
    }
    console.log(sum, people)
// break;
}
console.log(sum)