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

    // TODO

}

main();