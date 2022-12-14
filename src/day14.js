import { read, readEx } from './util.js';
import Vec from './util/Vec.js';
import Grid from './util/Grid.js';

await readEx();
await read();

let data;

/**
 * Range of [min, max]
 * */
const range = (min, max) => {
	const out = [];
	if (min > max) {
		const tmp = min;
		min = max;
		max = tmp;
	}
	for (let i = min; i <= max; ++i) {
		out.push(i);
	}
	return out;
};

const partOne = () => {
	/**
	 * @type {Vec[][]}
	 */
	const d = data.lines().map((l) => l.split(' -> ').map((l) => Vec.fromString(l.trim())));

	let minX = d
		.flatMap((v) => v)
		.map((v) => v.x)
		.min();
	const minY = 0; // d.flatMap(v => v).map(v => v.y).min();

	const maxX = d
		.flatMap((v) => v)
		.map((v) => v.x)
		.max();
	const maxY = d
		.flatMap((v) => v)
		.map((v) => v.y)
		.max();

	minX -= 5;

	const grid = new Array(maxY - minY + 1).fill(0).map(() => new Array(maxX - minX + 1 + 10).fill('.'));
	console.log(maxX - minX, maxY - minY);

	d.forEach((v) => {
		for (let i = 1; i < v.length; ++i) {
			const vec = v[i];
			const prev = v[i - 1];

			if (vec.y === prev.y) {
				for (let x of range(prev.x, vec.x)) {
					grid[vec.y - minY][x - minX] = '#';
				}
			} else if (vec.x === prev.x) {
				for (let y of range(prev.y, vec.y)) {
					grid[y - minY][vec.x - minX] = '#';
				}
			}
		}
	});

	console.log(grid.map((l) => l.join('')).join('\n'));

	const sandPos = new Vec(500 - minX, 0);

	let voided = false;
	let count = 0;
	dropper: while (!voided) {
		let { x, y } = sandPos;

		let moves = 0;

		let moving = true;
		outer: while (moving) {
			while (grid[y + 1] && grid[y + 1][x] === '.') {
				y++;
			}
			if (!grid[y]) {
				voided = true;
				break dropper;
			}
			for (let i = 1; i < 500; ++i) {
				if (!grid[y + 1]) {
					voided = true;
					break dropper;
				}
				// console.log(y + 1, x);
				// const di = grid.deepCopy();
				// di[y + 1][x] = '~';
				// console.log(di.map((l) => l.join('')).join('\n'));

				if (grid[y + 1][x] === '.') {
					moving = true;
					break;
				}
				if (grid[y + 1][x - i] === '.') {
					y++;
					x--;
				} else if (grid[y + 1][x + i] === '.') {
					y++;
					x++;
				} else {
					moving = false;
				}
				break;
			}
		}
		grid[y][x] = 'o';
		// console.log(grid.map((l) => l.join('')).join('\n'));

		// console.log(grid.map((l) => l.join('')).join('\n'));
		// console.log();
	}
	grid.flatMap((l) => l)
		.filter((l) => l === 'o')
		.length.log('DONE');

	// console.log(d, { minX, minY, maxX, maxY });
};

const partTwo = () => {
	/**
	 * @type {Vec[][]}
	 */
	const d = data.lines().map((l) => l.split(' -> ').map((l) => Vec.fromString(l.trim())));

	let minX = d
		.flatMap((v) => v)
		.map((v) => v.x)
		.min();
	const minY = 0; // d.flatMap(v => v).map(v => v.y).min();

	let maxX = d
		.flatMap((v) => v)
		.map((v) => v.x)
		.max();
	const maxY = d
		.flatMap((v) => v)
		.map((v) => v.y)
		.max();

	const padd = 150;
	minX = Math.max(minX - padd, 0);
	maxX += padd;

	d.push([new Vec(minX, maxY + 2), new Vec(maxX, maxY + 2)]);

	const grid = new Array(maxY - minY + 5).fill(0).map(() => new Array(maxX - minX + 1).fill('.'));
	console.log(maxX - minX + 1, maxY - minY + 1);

	d.forEach((v) => {
		for (let i = 1; i < v.length; ++i) {
			const vec = v[i];
			const prev = v[i - 1];

			if (vec.y === prev.y) {
				console.log({ prev, vec });
				for (let x of range(prev.x, vec.x)) {
					grid[vec.y - minY][x - minX] = '#';
				}
			} else if (vec.x === prev.x) {
				for (let y of range(prev.y, vec.y)) {
					grid[y - minY][vec.x - minX] = '#';
				}
			}
		}
	});

	console.log(grid.map((l) => l.join('')).join('\n'));

	const sandPos = new Vec(500 - minX, 0);

	let voided = false;
	let count = -5;
	dropper: while (!voided) {
		let { x, y } = sandPos;

		let moves = 0;

		let moving = true;
		outer: while (moving) {
			while (grid[y + 1] && grid[y + 1][x] === '.') {
				y++;
			}
			if (!grid[y]) {
				voided = true;
				break dropper;
			}
			for (let i = 1; i < 500; ++i) {
				if (!grid[y + 1]) {
					voided = true;
					break dropper;
				}
				// console.log(y + 1, x);
				// const di = grid.deepCopy();
				// di[y + 1][x] = '~';
				// console.log(di.map((l) => l.join('')).join('\n'));

				if (grid[y + 1][x] === '.') {
					moving = true;
					break;
				}
				if (grid[y + 1][x - i] === '.') {
					y++;
					x--;
				} else if (grid[y + 1][x + i] === '.') {
					y++;
					x++;
				} else {
					moving = false;
				}
				break;
			}
		}
		grid[y][x] = 'o';

		let newCount = grid.flatMap((l) => l).filter((l) => l === 'o').length;
		// console.log({ count, newCount });
		if (count !== newCount) {
			count = newCount;
		} else {
			count = newCount;
			break;
		}
		// console.log(grid.map((l) => l.join('')).join('\n'));

		// console.log();
	}
	console.log(grid.map((l) => l.join('')).join('\n'));
	// grid.flatMap((l) => l)
	// 	.filter((l) => l === 'o')
	// 	.length.log('DONE');
	count.log();

	// console.log(d, { minX, minY, maxX, maxY });
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	partOne();
	partTwo();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	partOne(); // 00:46:07
	partTwo(); // 01:16:34 -- I have no idea if this actually completely works, I just calculated everything outside of the bounds using the magic of MATHS
}
