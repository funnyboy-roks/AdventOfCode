import { read, readEx } from './util.js';

let data;

const partOne = () => {
	const lines = data.lines();
	const total = [];
	for (const line of lines) {
		if (line.trim().startsWith('1')) break;
		let last = '';
		const out = [];
		let n = 0;
		for (let i = 0; i < line.length; ++i) {
			const s = line[i] + line[i + 1] + line[i + 2];
			n++;
			if (s.trim()) out[n] = s;
			i += 3;
		}
		out.log();
		out.map((e) => (!e ? null : e.substring(1, 2))).forEach((n, i) => {
			if (!n) return;
			total[i] ? total[i].push(n) : (total[i] = [n]);
		});
	}
	console.log('total');
	total.shift();
	total.log();

	console.log('magic');

	lines
		.filter((l) => l.startsWith('move'))
		.map((l) => l.match(/move (\d+) from (\d+) to (\d+)/i))
		.forEach(([, n, f, d]) => {
            const newValues = total[f - 1].splice(0, n)
            total[d - 1] = newValues.concat(total[d-1]);
			// total[d - 1].unshift(total[f - 1].shift());
			total.log();
		});
	total.log();
	total
		.map((t) => t[0])
		.join('')
		.log();
};

const partTwo = () => {};

console.log('--- --- Running Sample Data --- ---');
data = await readEx(); // Sample Data
partOne();
partTwo();

console.log('--- --- Running Real Data --- ---');
data = await read(); // Real Data
partOne();
partTwo();
