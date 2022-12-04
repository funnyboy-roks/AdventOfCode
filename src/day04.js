import { read, readEx } from './util.js';

let data;

if (process.argv[2]) data = await readEx(); // Sample Data
else data = await read(); // Real Data

const partOne = () => {
	const lines = data.lines().map((l) => l.split(',').map((n) => n.split('-').numbers()));
	lines
		.filter(([a, b]) => {
			return (a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1]);
		})
		.length.log('1:');
};

const partTwo = () => {
	const lines = data.lines().map((l) => l.split(',').map((n) => n.split('-').numbers()));
	lines
		.filter(([a, b]) => {
			// return a[1] >= b[0] || b[1] <= a[0] || a[0] >= b[0] || b[1] <= a[1];
			return !(a[1] < b[0] || a[0] > b[1]);
		})
		.length.log('2:');
};

// Part one was fine, but I fucked up the overlap on part two :(
partOne(); // 00:03:40 - Rank 623 (My highest ever!)
partTwo(); // 00:09:28
