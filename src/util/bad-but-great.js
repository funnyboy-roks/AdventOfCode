// This file makes every bone in my body hurt, *this is fine*

import path from 'path';
import clipboard from 'clipboardy';
import { spawn } from 'child_process';
import combinations from 'combinations';

const copy = (value) => {
	clipboard.writeSync(value + '');

	const proc = spawn('xclip', ['-i']);
	proc.stdin.write(value + '');
	proc.stdin.end();
	setTimeout(() => proc.kill(), 1000);
	console.log('Done Copying');
};

Object.defineProperties(Array.prototype, {
	sum: {
		value: function () {
			return this.reduce((a, b) => a + b, 0);
		},
	},
	product: {
		value: function () {
			return this.reduce((a, b) => a * b, 1);
		},
	},
	prod: {
		value: function () {
			return this.reduce((a, b) => a * b, 1);
		},
	},
	numbers: {
		value: function () {
			return this.map((n) => +n);
		},
	},
	nums: {
		value: function () {
			return this.map((n) => +n);
		},
	},
	strings: {
		value: function () {
			return this.map((n) => n + '');
		},
	},
	strs: {
		value: function () {
			return this.map((n) => n + '');
		},
	},
	deduped: {
		value: function () {
			return [...new Set(this)];
		},
	},
	counts: {
		value: function () {
			const counter = {};

			for (const c of this) {
				counter[c] = counter[c] ? counter[c] + 1 : 1;
			}

			return counter;
		},
	},
	max: {
		value: function (count = 1) {
			if (count == 1) return Math.max(...this);
			return this.sorted(true).slice(0, count);
		},
	},
	min: {
		value: function (count = 1) {
			if (count == 1) return Math.min(...this);
			return this.sorted().slice(0, count);
		},
	},
	avg: {
		value: function () {
			return this.sum() / this.length;
		},
	},
	sorted: {
		value: function (reversed = false) {
			return [...this].sort((a, b) => (reversed ? b - a : a - b));
		},
	},
	ror: {
		value: function (count = 1) {
			for (let i = 0; i < count; ++i) {
				const fall = this.pop();
				this.unshift(fall);
			}
		},
	},
	rol: {
		value: function (count = 1) {
			for (let i = 0; i < count; ++i) {
				this.push(this.shift());
			}
		},
	},
	truthy: {
		value: function () {
			return this.filter((n) => n);
		},
	},
	falsy: {
		value: function () {
			return this.filter((n) => !n);
		},
	},
	copy: {
		value: function () {
			return this.slice();
		},
	},
	deepCopy: {
		value: function () {
			return JSON.parse(JSON.stringify(this));
		},
	},
	count: {
		value: function (valueOrFunction) {
			return this.filter(typeof valueOrFunction === 'function' ? valueOrFunction : (n) => n === valueOrFunction);
		},
	},
	split: {
		value: function (sep) {
			const arr = [[]];

			for (let i = 0; i < this.length; i++) {
				if (this[i] == sep) {
					arr.push([]);
				} else {
					arr.at(-1).push(this[i]);
				}
			}

			return arr;
		},
	},
	permute: {
		value: function () {
			if (this.length < 2) {
				return [this.copy()];
			}

			let permutationsArray = [];

			for (let i = 0; i < this.length; i++) {
				const elt = this[i];
				const remaining = [...this.slice(0, i), ...this.slice(i + 1, this.length)];
				for (const permutation of remaining.permute()) {
					permutationsArray.push(elt + permutation);
				}
			}
			return permutationsArray;
		},
	},
	chunk: {
		value: function (maxSize) {
			const out = [];
			this.forEach((v, i) => {
				if (i % maxSize === 0) out.push([v]);
				else out.at(-1).push(v);
			});
			return out;
		},
	},
	choose: {
		value: function (chooseAmt) {
			return combinations(this, chooseAmt).filter((n) => n.length === chooseAmt);
		},
	},
	first: {
		value: function (fn) {
			for (const i in this) if (fn(this[i], i, this)) return this[i];
		},
	},
});

Object.defineProperties(String.prototype, {
	matches: {
		value: function (regex = /.*/) {
			return regex.test(this);
		},
	},
	charCount: {
		value: function () {
			const counter = {};

			for (const c of this) {
				counter[c] = counter[c] ? counter[c] + 1 : 1;
			}
			return counter;
		},
	},
	permute: {
		value: function () {
			return [...this].permute();
		},
	},
	isLower: {
		value: function () {
			return this.toLowerCase() === this;
		},
	},
	isUpper: {
		value: function () {
			return this.toUpperCase() === this;
		},
	},
	lines: {
		value: function () {
			return this.split('\n');
		},
	},
	copy: {
		value: function () {
			copy(this);
		},
	},
});

Object.defineProperties(Number.prototype, {
	sqrt: {
		value: function () {
			return Math.sqrt(this);
		},
	},
	copy: {
		value: function () {
			copy(this);
		},
	},
});

Object.defineProperties(Object.prototype, {
	getEntries: {
		value: function () {
			return Object.entries(this);
		},
	},
	keys: {
		value: function () {
			return Object.keys(this);
		},
	},
	log: {
		value: function (prefix) {
			const originalPrepareStackTrace = Error.prepareStackTrace;
			Error.prepareStackTrace = (_, stack) => stack;

			const callee = new Error().stack[1];
			Error.prepareStackTrace = originalPrepareStackTrace;
			const location = `${path.basename(callee.getFileName())}:${callee.getLineNumber()}:${callee.getColumnNumber()}`;

			prefix ? console.log(prefix, this, 'from', location) : console.log(this, 'from', location);
			return this; // make it chainable
		},
	},
	cp: {
		value: function () {
			copy(this);
		},
	},
});
