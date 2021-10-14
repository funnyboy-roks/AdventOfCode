fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
	if (err) {
		console.error(err);
	}

	let d = data.split('\n');
	let vals = [];
	d.forEach((x) => {
		vals.push(parseInt(x));
	});
	for (let x of vals) {
		for (let y of vals) {
			if (x + y == 2020) {
				console.log('Match!', x + y, x * y);
				console.log('Numbers: ', x, y);
				return;
			}
		}
	}
});
