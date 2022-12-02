import fs from 'fs';

/**
 * @param {number} day
 */
export const loadRaw = (day) => {
	let d = day + '';
	d = d.padStart(2, '0');
	return fs.readFileSync(`input/day${d}.txt`, 'utf-8');
};

/**
 * @param {number} day
 * @param {string} sep
 */
export const array = (day, sep = '\n') => {
	const rawData = loadRaw(day);
	return rawData.split(sep);
};

/**
 * @param {number} day
 * @param {string} sep
 */
export const nums = (day, sep = '\n') => {
	return array(day, sep).map((n) => +n);
};

export const createMatrix = (width, height, defaultValueCreator) => {
	return new Array(height).fill(0).map((n) => new Array(width).fill(0).map(defaultValue));
};

export class Vec {
	constructor(x, y, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	mult(number) {
		this.x *= number;
		this.y *= number;
		this.z *= number;
	}

	add(other) {
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
	}

	distSq(other) {
		return (this.x - other.x) ** 2 + (this.y - other.y) ** 2 + (this.z + other.z) ** 2;
	}

	dist(other) {
		return this.distSq(other).sqrt();
	}

	manDist(other) {
		return Math.abs(this.x - other.x) + Math.abs(this.y - other.y) + Math.abs(this.z - other.z);
	}
}
