import './bad-but-great.js';
import { loadRaw } from './util.js';

let raw = loadRaw(1);
// raw = `1000
// 2000
// 3000

// 4000

// 5000
// 6000

// 7000
// 8000
// 9000

// 10000`;

'abc'.permute().log();

raw.lines()
	.split('')
	.map((n) => n.numbers().sum())
	.max()
	.log();

const arr = [1, 2, 3, 4, 5, 6];
arr.ror();
arr.log();
arr.rol(2);
arr.log();
