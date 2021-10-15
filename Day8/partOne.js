const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

const parseData = (data) =>
	data
		.replace(/\r/g, '')
		.split('\n')
		.map((line) => line.match(/^"(.+)"$/)[1]);

const run = () => {
	const data = parseData(input);

	const out = [];
	let diff = 0;

	for (const line of data) {
		const outStr = line.replace(/(\\")|(\\\\)|(\\x[a-f0-9]{2})/gi, '|');
		out.push({
			outStr,
			raw: line,
		});

		diff += line.length + 2 - outStr.length;
		// break;
	}
	console.log(out[0]);
	console.log(diff);
};

run();
