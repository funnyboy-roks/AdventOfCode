fs = require('fs');
utils = require('../utils')

let data = fs.readFileSync('input', 'utf8');

console.log('-= Data Loaded =-');

let arr2d = [];

for (let y of data.split('\n')) {
	arr2d.push(y.split(''));
}

let x = 3;
let count = 0;
for (let y of arr2d.slice(1)) {
	if (x > y.length - 1) {
		x -= y.length;
	}
	if (y[x] == '#') {
		count++;
		y[x] = 'X';
	} else {
		y[x] = 'O';
	}
	x += 3;
}
fs.writeFile('out', utils.array2djoin(arr2d), (e) => {
	return;
});

console.log(count);
