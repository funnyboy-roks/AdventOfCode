fs = require('fs');
utils = require('../utils');
const rawData = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '');
console.log('-= Data Loaded =-');

function processData(data){
    // Do some data processing
    let out = data.split('\n').map(x=>+x);
    return out.sort((a, b) => {return a-b});
}

function main(){
    let parsedData = processData(rawData)
    parsedData.push(Math.max(...parsedData) + 3);

    console.log(parsedData)
    let last = 0;
    let step = {
        '1': [],
        'c1': 0,
        '2': [],
        'c2': 0,
        '3': [],
        'c3': 0,
    }
    for(let num of parsedData){
        if(num - last){
            step['' + (num-last)].push(num);
            step['c' + (num-last)]++;
        }
        last = num;
    }
    
    console.log(step);
    console.log(step['1'].length * step['3'].length);
    
}

main();