import { read, readEx } from './util.js';

await readEx();
await read();

let data;

const doStuff = (part = 1) => {
	const monkeys = [];

	const lines = data.lines();

	let currentMonkey = 0;
	let monkeyData = [];
	for (const i in lines) {
		const line = lines[i];
		if (line.startsWith('Monkey')) {
			currentMonkey = +line.match(/Monkey (\d+):/i)[1];
			monkeyData[currentMonkey] = {};
		}
		if (line.trim().startsWith('Starting')) {
			monkeyData[currentMonkey].items = line.split(':')[1].trim().split(', ').nums();
		}
		if (line.trim().startsWith('Operation')) {
			monkeyData[currentMonkey].operation = line.split(':')[1].trim().replaceAll('new', 'newData');
		}
		if (line.trim().startsWith('Test')) {
			monkeyData[currentMonkey].divisBy = /* BigInt */ +line.match(/\d+/)[0];
		}
		if (line.trim().startsWith('If true')) {
			monkeyData[currentMonkey].ifTrue = /* BigInt */ +line.match(/\d+/)[0];
		}
		if (line.trim().startsWith('If false')) {
			monkeyData[currentMonkey].ifFalse = /* BigInt */ +line.match(/\d+/)[0];
		}
	}

	const mCounts = new Array(monkeyData.length).fill(0);
	monkeyData.log();

	const mod = monkeyData.map((m) => m.divisBy).prod();

	for (let round = 0; round < (part === 1 ? 20 : 10_000); ++round) {
		// const nextRound = monkeyData.deepCopy();
		// nextRound.forEach((m) => (m.items = []));
		// nextRound.log('next');
		// console.log('\nRound', round + 1);
		for (const i in monkeyData) {
			const m = monkeyData[i];
			for (let item of m.items) {
				// console.log(i, 'inspecting', item);
				mCounts[i]++;

				let newData = 0;
				let old = /* BigInt */ item;
				eval(m.operation);

				part === 1 ? (newData = Math.floor(newData / 3)) : (newData %= mod);

				if (!(newData % m.divisBy)) {
					monkeyData[m.ifTrue].items.push(newData);
				} else {
					monkeyData[m.ifFalse].items.push(newData);
				}
			}
			m.items = [];
		}

		if (round % 1000 === 0) {
			monkeyData.log();
		}
		// monkeyData = nextRound;
	}

	mCounts.max(2).prod().log();
	// mCounts.log();
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	doStuff(1);
	doStuff(2);
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	doStuff(1); // 00:25:41
	doStuff(2); // 01:16:03 - This was really quite bad -- took me a while to figure out the modulus trick
}
