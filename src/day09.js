import { read, readEx } from './util.js';
import Vec from './util/Vec.js';

await readEx();
await read();

let data;

const RIGHT = new Vec(1, 0);
const LEFT = new Vec(-1, 0);
const UP = new Vec(0, 1);
const DOWN = new Vec(0, -1);

const partOne = () => {
	/**
	 *
	 * @param {Vec} tail
	 * @param {Vec} head
	 * @param {string} direction
	 */
	const move = (tail, head, direction) => {
		if (direction === 'R') {
			head.add(RIGHT);
		} else if (direction === 'L') {
			head.add(LEFT);
		} else if (direction === 'U') {
			head.add(UP);
		} else if (direction === 'D') {
			head.add(DOWN);
		}

		const tailOff = tail.clone();
		tailOff.sub(head);

		tailOff.log();

		const { x, y } = tailOff;
		if (x === 2) {
			tail.add(LEFT);
			if (y === 1) {
				tail.add(DOWN);
			}
			if (y === -1) {
				tail.add(UP);
			}
		}
		if (x === -2) {
			tail.add(RIGHT);
			if (y === 1) {
				tail.add(DOWN);
			}
			if (y === -1) {
				tail.add(UP);
			}
		}
		if (y === -2) {
			tail.add(UP);
			if (x === 1) {
				tail.add(LEFT);
			}
			if (x === -1) {
				tail.add(RIGHT);
			}
		}
		if (y === 2) {
			tail.add(DOWN);
			if (x === 1) {
				tail.add(LEFT);
			}
			if (x === -1) {
				tail.add(RIGHT);
			}
		}
	};
	const lines = data.lines().map((l) => l.split(' ').map((v, i) => (i === 0 ? v : +v)));

	const tailVisited = new Set();
	const tailVisits = [];
	const head = new Vec(0, 0);
	const tail = head.clone();

	lines.forEach(([dir, amt]) => {
		for (let i = 0; i < amt; ++i) {
			tailVisited.add(tail.toString());
			tailVisits.push(tail.toString());
			move(tail, head, dir);
			tailVisited.add(tail.toString());
		}
		// tailVisited.log();
	});
	tailVisited.log();
	tailVisits.log();
	tailVisited.size.log();
};

const partTwo = () => {
	/**
	 *
	 * @param {Vec} head
	 * @param {Vec[]} pts
	 * @param {string} direction
	 */
	const move = (head, pts, direction) => {
		if (direction === 'R') {
			head.add(RIGHT);
		} else if (direction === 'L') {
			head.add(LEFT);
		} else if (direction === 'U') {
			head.add(UP);
		} else if (direction === 'D') {
			head.add(DOWN);
		}

		for (let i = 0; i < pts.length; ++i) {
			const tail = pts[i];
			const tailOff = tail.clone();
			tailOff.sub(i === 0 ? head : pts[i - 1]);

			// if(i === pts.length - 1) {
			// 	console.log('moving tail!', {tail, tailOff})
			// }

			const { x, y } = tailOff;
			if (x === 2) {
				tail.add(LEFT);
				if (y === 1) {
					tail.add(DOWN);
				}
				if (y === -1) {
					tail.add(UP);
				}
			}
			if (x === -2) {
				tail.add(RIGHT);
				if (y === 1) {
					tail.add(DOWN);
				}
				if (y === -1) {
					tail.add(UP);
				}
			}
			if (y === -2) {
				tail.add(UP);
				if (x === 1) {
					tail.add(LEFT);
				}
				if (x === -1) {
					tail.add(RIGHT);
				}
			}
			if (y === 2) {
				tail.add(DOWN);
				if (x === 1) {
					tail.add(LEFT);
				}
				if (x === -1) {
					tail.add(RIGHT);
				}
			}
		}
	};
	const lines = data.lines().map((l) => l.split(' ').map((v, i) => (i === 0 ? v : +v)));

	const tailVisited = new Set();
	const tailVisits = [];
	const head = new Vec(0, 0);
	/**
	 * @type {Vec[]}
	 */
	const pts = new Array(9).fill(0).map(h => head.clone());

	lines.forEach(([dir, amt]) => {
		for (let i = 0; i < amt; ++i) {
			tailVisited.add(pts.at(-1).toString());
			tailVisits.push(pts.at(-1).toString());
			move(head, pts, dir);
			tailVisited.add(pts.at(-1).toString());
		}
		// tailVisited.log();
	});
	tailVisited.log();
	tailVisits.log();
	tailVisited.size.log();
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	partOne();
	partTwo();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	partOne(); // 00:30:42 - Off by one error for 10 minutes b/c I didn't push the last location >:(
	partTwo(); // 00:45:32 - Took me such a long additional time because I added 10 knots instead of 9 🤦
}
