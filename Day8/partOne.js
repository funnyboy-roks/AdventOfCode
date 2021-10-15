const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

const parseData = (data) =>
	data
		.replace(/\r/g, '')
		.split('\n')
		.map((line) => line.match(/^"(.+)"$/));
        ''.match().

const run = () => {
	const data = parseData(input);
    console.log(data[0]);
};

run();
