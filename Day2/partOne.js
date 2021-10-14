const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').replace('\r', '');
const lines = input.split('\n');
// const lines = ['2x3x4'];

let amt = 0;

for (const line of lines) {
	const [l, w, h] = line.split('x').map((x) => +x);
	const sides = [l * w, w * h, h * l];
	const smallestSide = Math.min(...sides);
	amt += sides.map((s) => 2 * s).reduce((a, b) => a + b, 0);
	amt += smallestSide;
}

console.log(amt);
