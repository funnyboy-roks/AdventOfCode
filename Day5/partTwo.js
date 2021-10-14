const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');
const lines = input.split('\n');
// const lines = ['qjhvhtzxzqqjkmpb'];

const checkline = (line = '') => {
	let prev2 = -1;
	let prev = 0;
	let output = false;
	const combos = [];
	for (const i in line) {
		const c = line[i];
		if (prev2 == c && prev != c) {
			output = true;
		}
		if (prev != 0) {
			combos.push({
				i: +i,
				value: prev + c,
			});
		}
		prev2 = prev;
		prev = c;
	}
	if(!output) return false;
	for (const i in combos) {
		const c1 = combos[i];
		for (let j = 0; j < combos.length; ++j) {
			const c2 = combos[j];
			if (c1 === c2) break;
			if (
				c1.value === c2.value &&
				c1.i !== c2.i + 1
			) {
				console.log('Combos', c1, c2);
				return true;
			}
		}
	}
	console.log('Combos', combos);
	return false;
};

const valid = lines.filter(checkline);

console.log(valid.length);
