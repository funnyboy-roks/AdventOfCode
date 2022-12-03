import './bad-but-great.js';
import { loadRaw } from './util.js';

let data = loadRaw(3);

if (process.argv[2])
	// Sample Data
	data = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const p = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const partOne = () => {
	let stuff = data.lines().map((n) => [n.substring(0, Math.floor(n.length / 2)), n.substring(Math.floor(n.length / 2))]);

	let newL = [''];

	stuff.forEach(([a, b]) => {
		for (let c of b) {
			if (a.includes(c)) {
				newL.push(newL.pop() + c);
			}
		}
		newL.push('');
	});

	newL.map((n) => p.indexOf([...n].deduped().join``))
		.truthy()
		.map((n) => n + 1)
		.sum()
		.log();
	// stuff.log();
};

const partTwo = () => {
	let stuff = data.lines().truthy();
	// .map((n) => [n.substring(0, Math.floor(n.length / 2)), n.substring(Math.floor(n.length / 2))]);

	let groups = [];
	stuff.forEach((v, i) => {
		if (i % 3 == 0) groups.push([v]);
		else groups.at(-1).push(v);
	});

	let newT = [];

	console.log(groups);

	for (let i in groups) {
		let g = groups[i];
		if (typeof g[0] != 'string') continue;
		for (let c of g[0]) {
			console.log('checking', c, 'in', g[1]);
			console.log('checking', c, 'in', g[2]);
			if (g[1].includes(c) && g[2].includes(c)) {
				newT[i] = newT[i] ? newT[i] + c : c;
				break;
			}
		}
	}

	newT.map((n) => p.indexOf([...n].deduped().join``))
		.truthy()
		.map((n) => n + 1)
		.sum()
		.log();

	// groups.log();
};

// This is a little disappointing, ngl
partOne(); // 00:08:40
partTwo(); // 00:24:42
