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
			for (let z of vals) {
				if (x + y + z == 2020) {
					console.log('Match!', x + y + z, x * y * z);
					console.log('Numbers: ', x, y, z);
					return;
				}
			}
		}
	}
});
