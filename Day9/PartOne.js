fs = require('fs');
utils = require('../utils');
const rawData = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '');
console.log('-= Data Loaded =-');

const preambleSize = 25;

function processData(data){
    // Do some data processing

    return data.split('\n');
}

function main(){
    const parsedData = processData(rawData)
    let valid = [];
    for(let i = preambleSize; i < parsedData.length; i++){
        let compareAgainst = parsedData.slice(i - preambleSize, i);
        for(let x of compareAgainst){
            let used = []
            for(let y of compareAgainst){
                if(+x != +y && +x + +y == parsedData[i]){
                    if(!valid.includes(+parsedData[i])){
                        valid.push(+parsedData[i])
                    }
                    used = [+x, +y];
                }
                
            }
        }

    }
    console.log(valid);
    for(let i = preambleSize; i < parsedData.length; i++){
        if(!valid.includes(+parsedData[i])){
            console.log(`Answer: ${+parsedData[i]}`)
        }
    }

}

main();