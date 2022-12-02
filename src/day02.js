import './bad-but-great.js';
import { loadRaw } from './util.js';

let data = loadRaw(2);

if (process.argv[2])
	// Sample Data
	data = `A Y
B X
C Z`;

const R = 1;
const P = 2;
const S = 3;
const partOne = () => {
	const moveMap = {
		A: 1,
		B: 2,
		C: 3,
		X: 1,
		Y: 2,
		Z: 3,
	};
	const lines = data.lines().map((l) => l.split(' ').map((n) => moveMap[n]));
	lines
		.map(([a, b]) => {
			if (a === b) return 3 + b;
			if (a === R && b === S) return b;
			if (a === P && b === R) return b;
			if (a === S && b === P) return b;
			return 6 + b;
		})
		// .truthy()
		.sum()
		.log();
};

const partTwo = () => {
	const moveMap = {
		A: R,
		B: P,
		C: S,

		X: 5,
		Y: 6,
		Z: 7,
	};

	//
	// X - Lose
	// Y - Draw
	// Z - Win
	//
	const lines = data.lines().map((l) => l.split(' ').map((n) => moveMap[n]));
	lines.log()
	lines
		.map(([a, b]) => {
			if (b === 6) return a + 3;
			if (b === 5) return (a === R ? S : a === S ? P : R) + 0;
			if (b === 7) return (a === R ? P : a === S ? R : S) + 6;
			return -1;
		})
		// .truthy()
		.sum()
		.log();
};

// This was horrible, I completely forgot how RPS worked :facepalm:
partOne(); // 00:16:10
partTwo(); // 00:21:29
