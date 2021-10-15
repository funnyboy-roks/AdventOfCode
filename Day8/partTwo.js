const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

const parseData = (data) => data.trim().replace(/\r/g, '').split('\n');
// .map((line) => line.match(/^"(.+)"$/)[1]);

const run = () => {
	const data = parseData(input);
	let diff = 0;

	for (const line of data) {
		const outStr = 
		line
		.replace(/"/g, '|"')
		.replace(/\\/g, '||')
		.replace(/\\/g, '||');
			// .replace(/\\x/g, '||x')

		diff += (outStr.length + 2) - line.length;
		// break;
	}
	// console.log(out[0]);
	console.log(diff);
};

run();
