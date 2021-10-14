const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

let depth = 0;

for(let i = 0; i < input.length; ++i) {
    const s = input[i];
    if(s === '(') {
        depth++;
    } else if(s === ')') {
        depth--;
    }
    if(depth == -1) {
        console.log(i+1);
    }
}

console.log(depth);