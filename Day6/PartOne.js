fs = require('fs');
utils = require('../utils');
let data = fs.readFileSync('input', 'utf8');
console.log('-= Data Loaded =-');

const groups = data.split('\n\n');

let sum = 0;
for( let group of groups){

    let questions = group.replace(/\n/g, '');
console.log(group);

    let out = [];
    for(let x of questions){
        if(!out.includes(x)){
            out.push(x);
        }
    }
    console.log(out.join(''))
    sum += out.length;

}
console.log(sum)