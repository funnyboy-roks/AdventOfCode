fs = require('fs');
utils = require('../utils');
let data = fs.readFileSync('input', 'utf8');
console.log('-= Data Loaded =-');

const valid = {
	byr: (num) => {
		return Number(num) >= 1920 && Number(num) <= 2002;
	},
	iyr: (num) => {
		return Number(num) >= 2010 && Number(num) <= 2020;
	},
	eyr: (num) => {
		return Number(num) >= 2020 && Number(num) <= 2030;
	},
	hgt: (str) => {
		if (str.endsWith('cm') || str.endsWith('in')) {
			if (str.endsWith('cm')) {
				let n = Number(str.replace(/cm/g, ''));
				return n >= 150 && n <= 193;
			}
			if (str.endsWith('in')) {
				let n = Number(str.replace(/in/g, ''));
				return n >= 59 && n <= 76;
			}
        }
        return false;
	},
	hcl: (str) => {
		try {
			return Boolean(str.match(/#[0-9a-f]{6}/i)[0] == str);
		} catch {
			return false;
		}
	},
	ecl: (str) => {
		return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(str);
	},
	pid: (str) => {
		return Boolean(str.match(/[0-9]{9}/)) && str.length == 9; // I'm so dumb, I can't believe I forgot to check length
	},
	cid: (x) => {
		return true;
	},
};

const reqFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const optFields = ['cid'];

const passports = data.split('\n\n');


let outStr = "";
let bad = 0;
for (let xi in passports) {
	let x = passports[xi];
	let passportFields = {};
	x.replace(/\n/g, ' ')
		.split(' ')
		.forEach((y) => {
			passportFields[y.split(':')[0]] = y.split(':')[1];
		});
	let fieldKeys = Object.keys(passportFields);
	console.log(passportFields);
	let out = 0;
	for (let reqField of reqFields) {
		let val;
		if (fieldKeys.includes(reqField)) {
			val = passportFields[reqField];
		}
		console.log(val);
		if (!(val != undefined && valid[reqField](val))) {
			bad++;
			break;
		}
		if(reqField == 'hcl'){
			outStr += passportFields.hcl + '\n'; 
		}
	}
}

fs.writeFile('hcls', outStr, e => {
	return;
})

console.log(passports.length - bad);
