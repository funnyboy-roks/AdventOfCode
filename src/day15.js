import { read, readEx } from './util.js';
import Vec from './util/Vec.js';

await readEx();
await read();

let data;

const doStuff = () => {
	const sensors = [];
	let beacons = [];

	data.lines().forEach((l) => {
		const [, sx, sy, bx, by] = l.match(/x=(-?\d+), y=(-?\d+).+?x=(-?\d+), y=(-?\d+)/);
		const beacon = new Vec(+bx, +by);
		const sensor = new Vec(+sx, +sy);
		sensors.push({
			vec: sensor,
			dist: sensor.manDist(beacon),
			beacon,
		});
		beacons.push(beacon);
		beacons = beacons
			.map((v) => v.toString())
			.deduped()
			.map((s) => Vec.fromString(s));
	});

	let minX = [...sensors.map((v) => v)].map((v) => v.vec.x - v.dist).min();
	let maxX = [...sensors.map((v) => v)].map((v) => v.vec.x + v.dist).max();

	console.log({ minX, maxX });

	let yMax = process.argv[2] ? 20 : 4000000;
	let xMax = process.argv[2] ? 20 : 4000000;
	outer: for (let y = 0; y <= yMax; ++y) { // Part Two
		// let y = 2000000; // Part One
		if (y % 1000 === 0) console.log('y:', y);
		xcount: for (let x = 0; x < xMax; ++x) {
			const pos = new Vec(x, y);
			// console.log(pos);
			if (x % 100000 === 0) console.log('x:', x, ' --- y:', y);
			// let within = false;
			for (const sensor of sensors) {
				if (sensor.vec.manDist(pos) <= sensor.dist) {
					x += sensor.dist - sensor.vec.manDist(pos); // This line improves it an undefined amount of time... Without this line, my code was running for 22 hours... with it... it ran for only 1 minute...
					continue xcount;
				}
			}
			// if (!within) {
				console.log(pos, pos.x * 4000000 + pos.y);
				break outer;
			// }
		}
	} // Part Two
	// pts.log();

	// console.log({ sensors, beacons });
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	doStuff();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	doStuff(); // 00:58:08
			   // 23:00:53 - Left it running overnight and most of the next day... until I figured out line 46 :facepalm:
}
