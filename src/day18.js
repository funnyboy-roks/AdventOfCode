import { read, readEx } from './util.js';
import Vec from './util/Vec.js';

await readEx();
await read();

let data;

const floodFill = (init, pts, visited = [], { minX, maxX, minY, maxY, minZ, maxZ, throwIf }) => {
	const contains = (pt) => {
		return pts.map((p) => p.toString()).includes(pt.toString());
	};

	if (visited.map((v) => v.toString()).includes(init.toString())) return [];

	visited.push(init);

	if (contains(init)) {
		// console.log(init, 'in pts');
		return [];
	}

	if(init.x < minX || init.x > maxX || init.y < minY || init.y > maxY || init.z < minZ || init.z > maxZ
		|| throwIf.has(init.toString())) {
		throw new Error('I\'m A terrible person with this code :P')
	}

	const out = [init];

	dirs.forEach((d) => {
		const rel = d.clone().add(init);
		const ff = floodFill(rel, pts, visited, { minX, maxX, minY, maxY, minZ, maxZ, throwIf });
		if (!ff.length) return;
		out.push(...ff);
	});
	return out;
};

const UP = new Vec(0, 0, 1);
const DOWN = new Vec(0, 0, -1);
const NORTH = new Vec(0, 1, 0);
const SOUTH = new Vec(0, -1, 0);
const EAST = new Vec(1, 0, 0);
const WEST = new Vec(-1, 0, 0);

const dirs = [UP, DOWN, NORTH, SOUTH, EAST, WEST];

const op = (vec) => {
	switch (vec) {
		case UP:
			return DOWN;
		case DOWN:
			return UP;

		case NORTH:
			return SOUTH;
		case SOUTH:
			return NORTH;

		case EAST:
			return WEST;
		case WEST:
			return EAST;
	}
	throw new Error('WTF');
};

const partOne = () => {
	/**
	 * @type {Vec[]}
	 */
	const pts = data.lines().map((v) => Vec.fromString(v));

	pts.forEach((p) => (p.openSides = [UP, DOWN, NORTH, SOUTH, EAST, WEST]));

	const strPts = pts.map((v) => v.toString());

	let sum = 0;

	pts.forEach((pt) => {
		dirs.forEach((d) => {
			const relative = pt.clone().add(d);
			const relPt = pts.filter((p) => relative.x === p.x && relative.y === p.y && relative.z === p.z)[0];
			// console.log({ relPt: relPt ? relPt.toString() : relPt, pt: pt.toString(), d, op: op(d), relative });
			if (!relPt) return;
			let index = pt.openSides.map((v) => v.toString()).indexOf(d.toString());
			if (index !== -1) pt.openSides.splice(index, 1); //pt.openSides.filter(p => !p.clone().add(d).equals(d));

			index = relPt.openSides.map((v) => v.toString()).indexOf(op(d).toString());
			if (index !== -1) relPt.openSides.splice(index, 1); //pt.openSides.filter(p => !p.clone().add(d).equals(d));
			// relPt.openSides = relPt.openSides.filter((p) => !p.clone().add(d).equals(op(d)));

			// console.log({ pt: pt.openSides, relPt: relPt.openSides });
		});
	});
	pts.map((p) => p.openSides.length)
		.sum()
		.log();
};

const partTwo = () => {
	/**
	 * @type {Vec[]}
	 */
	const pts = data.lines().map((v) => Vec.fromString(v));

	pts.forEach((p) => (p.openSides = [UP, DOWN, NORTH, SOUTH, EAST, WEST]));

	const strPts = pts.map((v) => v.toString());
	pts.forEach((pt) => {
		dirs.forEach((d) => {
			const relative = pt.clone().add(d);
			const relPt = pts.filter((p) => relative.x === p.x && relative.y === p.y && relative.z === p.z)[0];
			// console.log({ relPt: relPt ? relPt.toString() : relPt, pt: pt.toString(), d, op: op(d), relative });
			if (!relPt) return;
			let index = pt.openSides.map((v) => v.toString()).indexOf(d.toString());
			if (index !== -1) pt.openSides.splice(index, 1); //pt.openSides.filter(p => !p.clone().add(d).equals(d));

			index = relPt.openSides.map((v) => v.toString()).indexOf(op(d).toString());
			if (index !== -1) relPt.openSides.splice(index, 1); //pt.openSides.filter(p => !p.clone().add(d).equals(d));
			// relPt.openSides = relPt.openSides.filter((p) => !p.clone().add(d).equals(op(d)));

			// console.log({ pt: pt.openSides, relPt: relPt.openSides });
		});
	});

	let sum = pts.map((p) => p.openSides.length).sum();

	const floodedPts = new Set();

	const { max: maxX, min: minX } = pts.map((pt) => pt.x).minMax();
	const { max: maxY, min: minY } = pts.map((pt) => pt.y).minMax();
	const { max: maxZ, min: minZ } = pts.map((pt) => pt.z).minMax();

	for (let x = minX; x <= maxX; ++x) {
		// if(x % Math.floor((maxX - minX) / 5) === 0) console.log('1/5 x: ', x);
		// console.log(x);
		for (let y = minY; y <= maxY; ++y) {
			// if(y % Math.floor((maxY - minY) / 5) === 0) console.log('1/5 y: ', y);
			for (let z = minZ; z <= maxZ; ++z) {
				const pt = new Vec(x, y, z);
				if (z % Math.floor((maxZ - minZ) / 5) === 0) console.log(pt);;
				if (pts.map((p) => p.toString()).includes(pt.toString())) continue;
				let ff;
				try {
					ff = floodFill(pt, pts, [], { minX, maxX, minY, maxY, minZ, maxZ, throwIf: floodedPts });
					ff.forEach((pt) => floodedPts.add(pt.toString()));
				} catch (e) {
					continue;
				}
			}
		}
	}
	// const ff = floodFill(process.argv[2] ? new Vec(2, 2, 5) : new Vec(10, 10, 10), pts, []);

	floodedPts.size.log();
	floodedPts.forEach((ps) => {
		const pt = Vec.fromString(ps);

		// let index = pt.openSides.map((v) => v.toString()).indexOf(d.toString());
		// if (index !== -1) pt.openSides.splice(index, 1); //pt.openSides.filter(p => !p.clone().add(d).equals(d));

		dirs.forEach((d) => {
			const relative = pt.clone().add(d);
			const relPt = pts.filter((p) => relative.x === p.x && relative.y === p.y && relative.z === p.z)[0];
			// console.log({ relPt: relPt ? relPt.toString() : relPt, pt: pt.toString(), d, op: op(d), relative });
			if (!relPt) return;
			let index = relPt.openSides.map((v) => v.toString()).indexOf(op(d).toString());
			if (index !== -1) relPt.openSides.splice(index, 1); //pt.openSides.filter(p => !p.clone().add(d).equals(d));
			// relPt.openSides = relPt.openSides.filter((p) => !p.clone().add(d).equals(op(d)));

			// console.log({ pt: pt.openSides, relPt: relPt.openSides });
		});
	});

	pts.map((p) => p.openSides.length)
		.sum()
		.log();
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	// partOne();
	partTwo();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	// partOne();
	partTwo();
}
