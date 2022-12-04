import { read } from './util.js';

let data = await read(+process.argv[1].match(/.+?(\d+)\.js$/i)[1]); // Get the current day based off the command line args

if (process.argv[2])
	// Sample Data
	data = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const partOne = () => {
	const lines = data.lines().map((l) => l.split(',').map((n) => n.split('-').numbers()));
	lines
		.filter(([a, b]) => {
			return (a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1]);
		})
		.length.log();
};

const partTwo = () => {
	const lines = data.lines().map((l) => l.split(',').map((n) => n.split('-').numbers()));
	lines
		.filter(([a, b]) => {
			// return a[1] >= b[0] || b[1] <= a[0] || a[0] >= b[0] || b[1] <= a[1];
			return !(
				(a[1] < b[0]) ||
				(a[0] > b[1]) 
			);
		})
		.length.log();
};

// Part one was fine, but I fucked up the overlap on part two :(
partOne(); // 00:03:40 - Rank 623 (My highest ever!)
partTwo(); // 00:09:28
