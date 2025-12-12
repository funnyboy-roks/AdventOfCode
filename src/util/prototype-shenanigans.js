// This file makes every bone in my body hurt, *this is fine*

import path from 'node:path';
import { combinations } from "combinatorics";

const ogSort = Array.prototype.sort;

const toUnique = (a) => {
    if (typeof a === 'string') {
        return a;
    } else if (typeof a === 'number') {
        return a;
    } else if (Object.getPrototypeOf(a)?.valueOf) {
        const pt = Object.getPrototypeOf(a);
        return pt.valueOf.call(a)
    } else {
        throw new Error('Cannot be converted into unique value: ' + a);
    }
};

const cmp = (a, b) => {
    if (typeof a === 'string') {
        return a.localeCompare(b);
    } else if (typeof a === 'number') {
        return a - b;
    } else if (Object.getPrototypeOf(a)?.cmp) {
        const pt = Object.getPrototypeOf(a);
        return pt.cmp.call(a, b)
    } else if (Object.getPrototypeOf(a)?.toString) {
        const pt = Object.getPrototypeOf(a);
        return a.toString().localeCompare(b)
    } else {
        return (a + '').localeCompare(b + '')
    }
};

Object.defineProperties(Array.prototype, {
    last: {
        value: function() {
            return this.at(-1);
        }
    },
	sum: {
		value: function(start = 0) {
			return this.reduce((a, b) => a + b, start);
		},
	},
	product: {
		value: function (start = 1) {
			return this.reduce((a, b) => a * b, start);
		},
	},
	prod: {
		value: function (start = 1) {
			return this.reduce((a, b) => a * b, start);
		},
	},
	bigints: {
		value: function () {
			return this.map(BigInt);
		},
	},
	numbers: {
		value: function () {
			return this.map(Number);
		},
	},
	nums: {
		value: function () {
			return this.map(Number);
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
	counts: {
		value: function () {
			const counter = new Map();

			for (const c of this) {
				counter.set(c, (map.get(c) ?? 0) + 1);
			}

			return counter;
		},
	},
	max: {
		value: function (count = 1) {
			if (count === 1) return Math.max(...this);
			return this.sorted(true).slice(0, count);
		},
	},
	min: {
		value: function (count = 1) {
			if (count === 1) return Math.min(...this);
			return this.sorted().slice(0, count);
		},
	},
	minMax: {
		value: function (count = 1) {
			return { min: this.min(count), max: this.max(count) };
		},
	},
	avg: {
		value: function () {
			return this.sum() / this.length;
		},
	},
	sorted: {
		value: function (reversed = false) {
			return [...this].sort(null, reversed);
		},
	},
    ogSort: {
        value: ogSort,
    },
    sort: {
		value: function (fn = null, reversed = false) {
            const og = ogSort.bind(this);
            if (fn) return og(fn);

            if (this.length <= 1) return this;
            const first = this[0];

            return reversed 
                ? og((a, b) => -cmp(a, b))
                : og((a, b) =>  cmp(a, b));
        }
    },
	sortByKey: {
		value: function (fn, reversed = false) {
            if (this.length <= 1) return [...this];
            const first = this[0];

			return reversed
                ? [...this].sort((a, b) => -cmp(fn(a), fn(b)))
                : [...this].sort((a, b) =>  cmp(fn(a), fn(b)));
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
            return this;
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
			return structuredClone(this);
		},
	},
	count: {
		value: function (valueOrFunction) {
			return this.filter(typeof valueOrFunction === 'function' ? valueOrFunction : (n) => n === valueOrFunction).length;
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
    insert: {
        value: function ( index, ...items ) {
            this.splice( index, 0, ...items );
        }
    },
    repeat: {
        value: function (n) {
            const out = [];
            for (let i = 0; i < n; ++i) {
                out.push(...this);
            }
            return out;
        }
    },
    unique: {
        value: function () {
            const seen = new Set();
            return this.filter(v => {
                const u = toUnique(v);
                if (seen.has(u)) return false;
                seen.add(u);
                return true;
            });
        }
    },
    uniqueByKey: {
        value: function (fn) {
            const seen = new Set();
            return this.filter(v => {
                const u = toUnique(fn(v));
                if (seen.has(u)) return false;
                seen.add(u);
                return true;
            });
        }
    },
    filter_map: {
        value: function(fn) {
            const out = []
            this.forEach((t, i, a) => {
                const y = fn(t, i, a);
                if (y !== undefined) {
                    out.push(y);
                }
            });
            return out;
        },
    },
    unzip: {
        value: function() {
            const left = [];
            const right = [];
            this.forEach(([l, r]) => {
                left.push(l)
                right.push(r)
            });
            return [left, right];
        }
    },
    zip: {
        value: function(other=undefined) {
            if (other) {
                return this.map((n, i) => [n, other[i]]);
            } else {
                const [left, right] = this;
                return left.map((l, i) => [l, right[i]]);
            }
        }
    },
    window: {
        value: function(size) {
            let out = [];
            for (let i = 0; i <= this.length - size; ++i) {
                out.push(this.slice(i, i + size));
            }
            return out;
        }
    },
	any: {
		value: Array.prototype.some,
	},
	all: {
		value: Array.prototype.every,
	},
	transpose: {
		value: function() {
            let out = [];
            for (let i = 0; i < this[0].length; ++i) {
                out.push(this.map(l => l[i]));
            }
            return out;
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
	is_palendrome: {
		value: function () {
            for (let i = 0; i < this.length / 2; ++i) {
                if (this[i] !== this[this.length - i - 1]) return false;
            }
            return true;
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
	digits: {
        value: function (base = 10) {
            let n = 0;
            let t; t = this;
            if (t % 1) throw new Error(`can't get digits of float: ${t}`);
            while (t > 0) {
                n += 1;
                t = Math.floor(t / base);
            }
            return n;
		},
	},
    sign: {
        value: function() {
            return this === 0 ? 0 : x < 0 ? -1 : 1
        }
    }
});

Object.defineProperties(Object.prototype, {
	// log: {
	// 	value: function (prefix) {
	// 		const originalPrepareStackTrace = Error.prepareStackTrace;
	// 		Error.prepareStackTrace = (_, stack) => stack;

	// 		const callee = new Error().stack[1];
	// 		Error.prepareStackTrace = originalPrepareStackTrace;
	// 		const location = `${path.basename(callee.getFileName())}:${callee.getLineNumber()}`;

	// 		prefix ? console.log(location, `[${prefix}]`, this) : console.log(location, this);
	// 		return this; // make it chainable
	// 	},
	// },
});
