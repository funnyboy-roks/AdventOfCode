import { read, readEx } from './util.js';
import Vec from './util/Vec.js';

await readEx();
await read();

let data;

const alpha = 'abcdefghijklmnopqrstuvwxyz';

const dirs = [new Vec(0, 1), new Vec(0, -1), new Vec(1, 0), new Vec(-1, 0)];

const dij = (grid, src) => {
	let q = [];
	let dist = {};
	let prev = {};

	// for (let dir of dirs) {
	// 	// const gridSpot = grid[src.y + dir.y] ? grid[src.y + dir.y][src.x + dir.x] : undefined;
	// 	// console.log(dir);
	// 	let v;
	// 	if(grid[src.y + dir.y] !== undefined) {
	// 		v = grid[src.y + dir.y][src.x + dir.x];
	// 	}
	// 	// console.log(v);
	// 	if(v === undefined) continue;
	// 	v = new Vec(src.x + dir.x, src.y + dir.y);
	// 	console.log(v);
	// 	dist.set(v, Infinity);
	// 	prev.set(v,undefined);
	// 	q.push(v);
	// }

	grid.forEach((v, y) =>
		v.forEach((n, x) => {
			dist[new Vec(x, y).toString()] = Infinity;
			prev[new Vec(x, y).toString()] = undefined;
			q.push(new Vec(x, y).toString());
		})
	);
	// q.log('Q:')

	// dist.set(src, 0);
	dist[src.toString()] = 0;
	// q.push(src.toString());
	// q.log();

	while (q.length) {
		// q.log('Q: ');
		// let u = q.copy().sort((a, b) => grid[a.y][a.x] - grid[b.y][b.x]).at(0);
		let entries = [...Object.entries(dist)].sort((a, b) => a[1] - b[1]).filter((e) => q.includes(e[0].toString()));
		let entry = entries[0][0];
		let u = Vec.fromString(entry);
		// q.log();
		q = q.filter((e) => !(e === u.toString()));

		for (let dir of dirs) {
			let v;
			if (grid[u.y + dir.y] !== undefined) {
				v = grid[u.y + dir.y][u.x + dir.x];
			}
			// console.log(v);
			if (v === undefined) continue;
			v = new Vec(u.x + dir.x, u.y + dir.y);
			if (!q.includes(v.toString())) continue;
			if (v.x === 5 && v.y === 2) {
				// console.log('HERE', v, u, q);
			}
			// console.log('HELLO', v, dist[v]);

			// console.log('GRID PT', grid[v.y][v.x], v);
			let dstep = grid[v.y][v.x] - grid[u.y][u.x];
			if (dstep > 1) continue; // Part One
			// if (dstep < -1) continue; // Part Two

			let alt = dist[u.toString()] + 1; //(grid[v.y][v.x] === 'E' ? 0 : grid[v.y][v.x]); /*  - grid[u.y, u.x] */

			if (v.x === 5 && v.y === 2) {
				// console.log('HERE2', { alt, there: dist[v.toString()] });
			}
			if (alt < dist[v.toString()]) {
				// dist[v] = alt;
				dist[v.toString()] = alt;
				prev[v.toString()] = u;
				// prev.set(v, u);
			}
		}
	}

	return { dist, prev };
};

const partOne = () => {
	const grid = data.split('\n').map((d) => d.split(``).map((l) => (alpha.indexOf(l) == -1 ? l : alpha.indexOf(l) + 1)));

	let start, end;

	for (let y = 0; y < grid.length; ++y) {
		for (let x = 0; x < grid[0].length; ++x) {
			if (grid[y][x] === 'S') {
				start = new Vec(x, y);
				grid[y][x] = 0;
			}
			if (grid[y][x] === 'E') {
				end = new Vec(x, y);
				grid[y][x] = 26;
			}
		}
	}

	// grid.log();
	const { dist, prev } = dij(grid, start);

	console.log(grid.map((n) => n.map((c) => (c === Infinity ? ' _ ' : (c + '').padStart(3, ' '))).join('')).join('\n'));

	console.log('---');

	let display = grid.deepCopy();

	Object.entries(dist).forEach(([k, v]) => {
		const ve = Vec.fromString(k);
		display[ve.y][ve.x] = v;
	});
	console.log(display.map((n) => n.map((c) => (c === Infinity ? ' _ ' : (c + '').padStart(3, ' '))).join('')).join('\n'));

	console.log({ start, end });
	console.log(dist[end.toString()]);
	// console.log(new Vec(0, 0) == new Vec(0, 0));
};

const partTwo = () => {
	const grid = data.split('\n').map((d) => d.split(``).map((l) => (alpha.indexOf(l) == -1 ? l : alpha.indexOf(l) + 1)));

	let start, end;

	for (let y = 0; y < grid.length; ++y) {
		for (let x = 0; x < grid[0].length; ++x) {
			if (grid[y][x] === 'S') {
				start = new Vec(x, y);
				grid[y][x] = 1;
			}
			if (grid[y][x] === 'E') {
				end = new Vec(x, y);
				grid[y][x] = 26;
			}
		}
	}
	
	const as = [];

	grid.forEach((row, y) => {
		row.forEach((item, x) => {
			if(item === 1) {
				as.push(new Vec(x, y));
			}
		})
	})

	console.log('A\'s:', as.length);

	const {dist } = dij(grid, end);

	const dists = as.map((vec, i) => {
		if(i % 10) console.log(i);
		return dist[vec.toString()]
		// return dij(grid, vec).dist[end.toString()]
	});
	dists.log();
	dists.min().log();
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	partOne();
	partTwo();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	partOne(); // 01:40:43
	partTwo(); // 10:25:12 -- I went to bed :P
}
