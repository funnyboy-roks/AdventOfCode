fs = require('fs');
utils = require('../utils');
const rawData = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '');
console.log('-= Data Loaded =-');

function processData(data) {
	return data.split('\n');
}

async function isFiniteLoop(lines) {
	let acc = 0;
	let processedIns = [];
	for (let i = 0; i < lines.length; ++i) {
		const line = lines[i];
		if (processedIns.includes(i)) {
			return false;
		}
		processedIns.push(i);
		let [, instruction, amount] = line.match(/([a-z]{3}) ([+-][0-9]+)/);
		amount = +amount;

		if (instruction == 'acc') {
			acc += amount;
		}
		if (instruction == 'jmp') {
			i += amount - 1;
		}
	}

	console.log('ACC: ', acc);
	return acc;
}

async function main() {
	const formattedData = processData(rawData);

	for (let i = 0; i < formattedData.length; i++) {
		let tempData = [...formattedData];

		let line = tempData[i];
		let [, instruction, amount] = line.match(/([a-z]{3}) ([+-][0-9]+)/);
		if (instruction == 'nop') {
			tempData[i] = line.replace(/nop/, 'jmp');
		} else if (instruction == 'jmp') {
			tempData[i] = line.replace(/jmp/, 'nop');
		} else {
			continue;
		}
		let finiteLoop = await isFiniteLoop(tempData);
		console.log('Line', i, ':', finiteLoop);
		if (finiteLoop != false) {
			console.log('-----------');
			console.log('ACC:', finiteLoop);
			break;
		}
	}
}

main();
