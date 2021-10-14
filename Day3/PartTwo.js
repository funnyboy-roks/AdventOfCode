fs = require('fs');
utils = require('../utils')

const data = fs.readFileSync('input', 'utf8');

console.log('-= Data Loaded =-');

function run(rStep, dStep) {
	let arr2d = [];

	for (let y of data.split('\n')) {
		arr2d.push(y.split(''));
	}

	let x = rStep;
	let count = 0;

	for (let yi = dStep; yi < arr2d.length; yi += dStep) {
		let y = arr2d[yi];
		if (x > y.length - 1) {
			x -= y.length;
		}
		if (y[x] == '#') {
			count++;
			y[x] = 'X';
		} else {
			y[x] = 'O';
		}
		x += rStep;
	}
	fs.writeFile(`out-${rStep}_${dStep}`, utils.array2djoin(arr2d), (e) => {
		return;
	});

	console.log(count);
	return count;
}

let outArr = [];
outArr.push(run(1, 1));
outArr.push(run(3, 1));
outArr.push(run(5, 1));
outArr.push(run(7, 1));
outArr.push(run(1, 2));

let out = 1;
outArr.forEach((x) => (out *= x));
console.log(out);
