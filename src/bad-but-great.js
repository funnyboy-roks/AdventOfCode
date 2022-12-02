// This file makes every bone in my body hurt, *this is fine*

import path from 'path';

Array.prototype.sum = function () {
	return this.reduce((a, b) => a + b, 0);
};

Array.prototype.product = function () {
	return this.reduce((a, b) => a * b, 1);
};

Array.prototype.numbers = function () {
	return this.map((n) => +n);
};

Array.prototype.strings = function () {
	return this.map((n) => n + '');
};

Array.prototype.deduped = function () {
	return [...new Set(this)];
};

Array.prototype.counts = function () {
	const counter = {};

	for (const c of this) {
		counter[c] = counter[c] ? counter[c] + 1 : 1;
	}

	return counter;
};

Array.prototype.max = function (count = 1) {
	if (count == 1) return Math.max(...this);
	return this.sorted(true).slice(0, count);
};

Array.prototype.min = function (count = 1) {
	if (count == 1) return Math.min(...this);
	return this.sorted().slice(0, count);
};

Array.prototype.avg = function () {
	return this.sum() / this.length;
};

Array.prototype.sorted = function (reversed = false) {
	return [...this].sort((a, b) => (reversed ? b - a : a - b));
};

Array.prototype.ror = function (count = 1) {
	for (let i = 0; i < count; ++i) {
		const fall = this.pop();
		this.unshift(fall);
	}
};

Array.prototype.rol = function (count = 1) {
	for (let i = 0; i < count; ++i) {
		this.push(this.shift());
	}
};

Array.prototype.truthy = function () {
	return this.filter((n) => n);
};

Array.prototype.falsy = function () {
	return this.filter((n) => !n);
};

Array.prototype.copy = function () {
	return this.slice();
};

Array.prototype.count = function (valueOrFunction) {
	return this.filter(typeof valueOrFunction === 'function' ? valueOrFunction : (n) => n === valueOrFunction);
};

Array.prototype.deepCopy = function () {
	return JSON.parse(JSON.stringify(this));
};

Array.prototype.split = function (sep) {
	const arr = [[]];

	for (let i = 0; i < this.length; i++) {
		if (this[i] == sep) {
			arr.push([]);
		} else {
			arr.at(-1).push(this[i]);
		}
	}

	return arr;
};

Array.prototype.permute = function () {
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
};

String.prototype.matches = function (regex = /.*/) {
	return regex.test(this);
};

String.prototype.charCount = function () {
	const counter = {};

	for (const c of this) {
		counter[c] = counter[c] ? counter[c] + 1 : 1;
	}
	return counter;
};

String.prototype.permute = function () {
	return [...this].permute();
};

String.prototype.isLower = function () {
	return this.toLowerCase() === this;
};

String.prototype.isUpper = function () {
	return this.toUpperCase() === this;
};

String.prototype.lines = function () {
	return this.split('\n');
};

Number.prototype.sqrt = function () {
	return Math.sqrt(this);
};

Object.prototype.entries = function () {
	return Object.entries(this);
};

Object.prototype.keys = function () {
	return Object.keys(this);
};

Object.prototype.values = function () {
	return Object.values(this);
};

Object.prototype.log = function () {
	const originalPrepareStackTrace = Error.prepareStackTrace;
	Error.prepareStackTrace = (_, stack) => stack;

	const callee = new Error().stack[1];
	Error.prepareStackTrace = originalPrepareStackTrace;
	const location = `${path.basename(callee.getFileName())}:${callee.getLineNumber()}:${callee.getColumnNumber()}`;

	console.log(this, 'from', location);
};
