import { read, readEx } from './util.js';

await readEx();
await read();

let data;

/**
 * - = left < right
 * + = left > right
 * 0 = left = right
 */
const compare = (left, right) => {
	if (left !== undefined && right === undefined) return -1;
	if (left === undefined && right !== undefined) return 1;
	console.log('compare', left, 'vs', right);
	if (typeof left === 'number') {
		if (typeof right === 'number') {
			// num num
			if (left === right) {
				console.log('num -> ', 0);
				return 0;
			} else if (left < right) {
				console.log('num -> ', 1);
				return 1;
			} else {
				console.log('num -> ', -1);
				return -1;
			}
		}
		if (typeof right === 'object') {
			// num []
			return compare([left], right);
		}
	} else if (typeof right === 'number') {
		if (typeof left === 'object') {
			// [] num
			return compare(left, [right]);
		}
	} else if (typeof left === 'object') {
		// [] []
		if (typeof right === 'object') {
			console.log('[] []', { left, right });
			for (let i = 0; i < Math.max(left.length, right.length); ++i) {
				const comp = compare(left[i], right[i]);
				({ i, comp }.log());
				if (comp !== 0) return comp;
			}
			return 0;
		}
	} else {
		throw new Error('wtf');
	}
};

const partOne = () => {
	const lines = data.lines();

	const groups = [[]];

	for (let line of lines) {
		if (line.trim() === '') {
			groups.push([]);
		} else {
			let data;
			line = 'data = ' + line;
			eval(line);
			groups.at(-1).push(data);
		}
	}

	// console.log(groups);

	const correct = [];

	for (let i in groups) {
		// let i = 1;
		const [left, right] = groups[i];

		// for (let j in left) {
		const comp = compare(left, right);
		console.log({ i: +i + 1, comp });
		// }
		if (comp !== -1) correct.push(+i + 1);

		console.log({ left, right });
	}

	correct.sum().log();
};

const partTwo = () => {
	const lines = data.lines();

	let divs = [[[2]], [[6]]];

	const groups = [...divs];

	divs = divs.map(d => JSON.stringify(d));

	for (let line of lines) {
		if (line.trim() === '') {
		} else {
			let data;
			line = 'data = ' + line;
			eval(line);
			groups.push(data);
		}
	}

	groups.sort((a, b) => -compare(a, b)); 
	const a = groups.map(n => JSON.stringify(n)).indexOf(divs[0]) + 1
	const b = groups.map(n => JSON.stringify(n)).indexOf(divs[1]) + 1

	console.log(a * b);
	// console.log(groups);


	const correct = [];

	// for (let i in groups) {
	// 	// let i = 1;
	// 	const [left, right] = groups[i];

	// 	// for (let j in left) {
	// 	const comp = compare(left, right);
	// 	console.log({ i: +i + 1, comp });
	// 	// }
	// 	if (comp !== -1) correct.push(+i + 1);

	// 	console.log({ left, right });
	// }

	correct.sum().log();
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	partOne();
	partTwo();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	partOne(); // 00:30:35 (Of course, I miss the smallest error >:( )
	partTwo(); // 00:36:34
}
