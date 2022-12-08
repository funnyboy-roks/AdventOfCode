import { read, readEx } from './util.js';
import Grid from './util/Grid.js';

await readEx();
await read();

let data;

const partOne = () => {
	const trees = data.lines().map((l) => l.split``.numbers());
	const width = trees[0].length;
	const height = trees.length;
	trees.log();

	let count = 0;

	trees.forEach((row, y) => {
		row.forEach((t, x) => {
			let max = -1;
			for (let i = 0; i < row.length; ++i) {
				if (i === x) {
					if (t > max) {
						console.log('left', t);
						++count;
						return true;
					} else {
						max = -1;
					}
				} else max = Math.max(max, row[i]);
			}
			if (t > max) {
				console.log('right', t);
				++count;
				return;
			}
			max = -1;
			for (let i = 0; i < trees.length; ++i) {
				if (i === y) {
					if (t > max) {
						console.log('top', t);
						++count;
						return true;
					} else {
						max = -1;
					}
				} else max = Math.max(max, trees[i][x]);
			}
			if (t > max) {
				console.log('down', t);
				++count;
				return;
			}
		});
		console.log('');
	});
	count.log();
};

const partTwo = () => {
	const trees = data.lines().map((l) => l.split``.numbers());
	const width = trees[0].length;
	const height = trees.length;
	trees.log();

	let count = 0;

	let maxScore = -1;

	trees.forEach((row, y) => {
		row.forEach((t, x) => {
			let score = 1;
			t.log();
			let i = 0;
			for (i = x + 1; i < row.length; ++i) {
				//right
				if (t <= row[i]) {
					++i;
					break;
				}
			}
			if (i === row.length) --i;
			score *= i - x;
			console.log('right', i - x);

			for (i = x - 1; i >= 0; --i) {
				//left
				if (t <= row[i]) {
					break;
				}
			}
			if (i === -1) i = 0;
			score *= x - i;
			console.log('left', x - i, { x, i });

			for (i = y + 1; i < trees.length; ++i) {
				//down
				if (t <= trees[i][x]) {
					++i;
					break;
				}
			}
			if (i === trees.length) --i;
			score *= i - y;
			console.log('down', i - y);

			for (i = y - 1; i >= 0; --i) {
				//up
				if (t <= trees[i][x]) {
					break;
				}
			}
			if (i === -1) i = 0;
			score *= y - i;
			console.log('up', y - i, { y, i });

			maxScore = Math.max(maxScore, score);
		});
		console.log('');
	});
	maxScore.log('Max Score');
	count.log();
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	partOne();
	partTwo();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	partOne(); // 00:11:36
	partTwo(); // 00:33:06
}
