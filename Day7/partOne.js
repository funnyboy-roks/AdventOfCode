const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const parse = (data) => {
	return data
		.replace(/\r/g, '')
		.split('\n')
		.map((line) => {
			if (/^[a-z0-9]+ -> [a-z]+/.test(line)) {
				[_, in1, out] = line.match(/([a-z0-9]+) -> ([a-z]+)/);
				return { in1, out, operation: 'ASSIGN' };
			} else if (line.startsWith('NOT')) {
				[_, operation, in1, out] = line.match(
					/(NOT) ([a-z0-9]+) -> ([a-z]+)/
				);
				return { operation, in1, out };
			} else {
				[_, in1, operation, in2, out] = line.match(
					/([a-z0-9]+) ([A-Z]+) ([a-z0-9]+) -> ([a-z]+)/
				);
				return { in1, operation, in2, out };
			}
		});
};

const run = () => {
	const data = parse(input);

	const wires = {};
	const nodes = [];

	for (let i in data) {
		const { operation, in1, in2, out } = data[i];

		const in1V = isNaN(+in1) ? wires[in1] : +in1;
		const in2V = isNaN(+in2) ? wires[in2] : +in2;

		nodes.push(new Node(operation, ));

		switch (operation) {
			case 'ASSIGN':
				wires[out] = +in1V;
				break;
			case 'AND':
				wires[out] = in1V & in2V;
				break;
			case 'OR':
				wires[out] = in1V | in2V;
				break;
			case 'LSHIFT':
				wires[out] = in1V < in2V;
				break;
			case 'RSHIFT':
				wires[out] = in1V > in2V;
				break;
			case 'NOT':
				wires[out] = ~in1V;
				break;
		}
		// break;
	}

	console.log(wires);
};

class Node {
	constructor(operation='', usages=[]) {
		this.usages = usages;
		this.operation = operation;
	}
}

class Wire {
	constructor(name='', value=0) {
		this.name = name;
		this.value = value;
	}
}

run();
