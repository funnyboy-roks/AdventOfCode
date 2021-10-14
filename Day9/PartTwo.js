fs = require('fs');
utils = require('../utils');
const rawData = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '');
const p1Ans = fs.readFileSync('PartOneOut-input.txt', 'utf8').replace(/\r/g, '');
console.log('-= Data Loaded =-');

function processData(data) {
	// Do some data processing

	return data.split('\n').map((x) => +x);
}

function main() {
	const parsedData = processData(rawData);
	for (let x in parsedData) {
		let index = x;
		let sum = 0;
		while (sum < +p1Ans) {
			sum += parsedData[index];
            index++;
            if(sum == +p1Ans){
                let outArr = parsedData.slice(x, index);
                console.log(sum, outArr, Math.max(...outArr) + Math.min(...outArr));
                return;
            }
		}
	}
}

main();
