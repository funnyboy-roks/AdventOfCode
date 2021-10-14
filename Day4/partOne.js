const fs = require('fs');
var md5 = require('blueimp-md5');

const input = fs.readFileSync('input.txt', 'utf-8');

let i = 0;

while (true) {
	const n = input + i;
	const m = md5(n);
	if(i % 1000 === 0) {
		console.log(`I: ${i} - M: ${m}`)
	};
	if (m.startsWith('00000')) {
		console.log(`Number: ${n}\nMD5: ${m}`);
		break;
	}
	++i;
}
