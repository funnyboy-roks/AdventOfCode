fs = require('fs');
utils = require('../utils');
const rawData = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '');
console.log('-= Data Loaded =-');

function processData(data) {
	return data.split('\n');
}

async function main() {
	const formattedData = processData(rawData);

	console.log(formattedData);
	let acc = 0;
	let processedIns = [];
	let i = 0;
	for (i = 0; i < formattedData.length; ++i) {
		console.log('-----------INDEX: ', i);

		const line = formattedData[i];
		if (processedIns.includes(i)) {
			break;
		}
		processedIns.push(i);
		let [, instruction, amount] = line.match(/([a-z]{3}) ([+-][0-9]+)/);
		amount = +amount;
		console.log(line, '|', instruction, amount);

		if (instruction == 'acc') {
			acc += amount;
		}
		if (instruction == 'jmp') {
			i += amount > 0 ? Math.abs(amount) - 1 : -(Math.abs(amount) + 1);
		}
		console.log('ACC: ', acc);
	}
	console.log(acc);
}

main();
