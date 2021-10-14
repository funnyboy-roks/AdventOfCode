const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').replace('\r', '');
const lines = input.split('\n');
// const lines = ['2x3x4'];

let amt = 0;

for (const line of lines) {
	const [l, w, h] = line.split('x').map((x) => +x);
	const perimters = [2 * l + 2 * w, 2 * w + 2 * h, 2 * h + 2 * l];
	amt += Math.min(...perimters);
	amt += l * w * h;
}

console.log(amt);
