const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');
const lines = input.split('\n');

const bannedStrs = ['ab', 'cd', 'pq', 'xy'];

const checkline = (line = '') => {
	for (const str of bannedStrs) {
		if (line.includes(str)) {
			return false;
		}
	}
	let vowels = 0;
	let prev = -1;
	let double = false;
	for (const c of line) {
		if ('aeiou'.includes(c)) {
			vowels++;
		}
		if (prev == c) {
			double = true;
		}
		prev = c;
	}
	if (vowels < 3) return false;
	return double;
};

const valid = lines.filter(checkline);

console.log(valid.length);
