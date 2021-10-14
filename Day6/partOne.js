const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');
const lines = input.split('\n');
// const lines = ['turn off 660,55 through 986,197'];

/**
 * @type {boolean[][]}
 */
const lights = [];

for (let i = 0; i < 1000; ++i) {
	const arr = [];
	for (let j = 0; j < 1000; ++j) {
		arr.push(true);
	}
	lights.push(arr);
}

for (const line of lines) {
	console.log(line);
	const [_, inst, r1, r2] = line.match(
		/([a-z0-9 ]+) (\d{1,3},\d{1,3}) through (\d{1,3},\d{1,3})/i
	);

	const [x1, y1] = r1.split(',');
	const [x2, y2] = r2.split(',');

	console.log(inst, r1, r2);

	for (let x = x1; x < x2; ++x) {
		for (let y = y1; y < y2; ++y) {
			switch (inst) {
				case 'turn on':
					lights[y][x] = true;
					break;
				case 'turn off':
					lights[y][x] = false;
					break;
				case 'toggle':
					lights[y][x] = !lights[y][x];
					break;
			}
		}
	}

	// console.log(match);
}
console.log(lights);

let valid = 0;
lights.forEach((r) => r.forEach((i) => (valid += i)));
console.log(valid);
