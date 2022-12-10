import { read, readEx } from './util.js';

await readEx();
await read();

let data;

const partOne = () => {
	const lines = data.lines().map((l) => l.split(' '));

	let x = 1;
	let cycle = 0;
	let strengths = 0;

	const checkSignal = () => {
		switch (cycle) {
			case 20:
			case 60:
			case 100:
			case 140:
			case 180:
			case 220:
				strengths += cycle * x;
				break;
		}
	};

	for (const line of lines) {
		switch (line[0]) {
			case 'noop':
				cycle++;
				checkSignal();
				break;
			case 'addx':
				cycle++;
				checkSignal();
				cycle++;
				checkSignal();
				x += +line[1];
				// checkSignal();
				break;
		}
	}
	strengths.log();
};

const partTwo = () => {
	const lines = data.lines().map((l) => l.split(' '));

	let x = 1;
	let cycle = 0;
	let out = '';

	const runCycle = () => {
		cycle++;
		const cx = (cycle % 40) - 1;
		const tx = x % 40;
		const tx2 = (x + 1) % 40;
		const tx3 = (x - 1) % 40;
		// console.log({cycle, tx, tx2, tx3})

		if (cx === tx || cx === tx2 || cx === tx3) {
			out += '#';
		} else {
			out += '.';
		}
		if (cycle % 40 === 0) {
			out += '\n';
		}
		// out.log();
	};

	for (const line of lines) {
		switch (line[0]) {
			case 'noop':
				runCycle();
				break;
			case 'addx':
				runCycle();
				runCycle();
				x += +line[1];
				break;
		}
	}
	// console.log();
	out.log();
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	partOne();
	partTwo();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	partOne(); // 00:06:04 - Rank 193 global - :O 
	partTwo(); // 00:27:32 (Missed a - 1 on the clock x :P)
}
