export default class Vec {
	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 */
	constructor(x, y, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	clone() {
		return new Vec(this.x, this.y, this.z);
	}

	/**
	 * @param {number} number
	 */
	mult(number) {
		this.x *= number;
		this.y *= number;
		this.z *= number;
		return this;
	}

	/**
	 * @param {number} other
	 */
	add(other) {
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
		return this;
	}

	/**
	 * @param {number} other
	 */
	sub(other) {
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;
		return this;
	}

    /**
     * @param {Vec} other 
     * @returns {number}
     */
	distSq(other) {
		return (this.x - other.x) ** 2 + (this.y - other.y) ** 2 + (this.z + other.z) ** 2;
	}

    /**
     * @param {Vec} other 
     * @returns {number}
     */
	dist(other) {
		return this.distSq(other).sqrt();
	}

    /**
     * Manhattan distance from this point to the other
     * @param {Vec} other 
     * @returns {number}
     */
	manDist(other) {
		return Math.abs(this.x - other.x) + Math.abs(this.y - other.y) + Math.abs(this.z - other.z);
	}

	toString() {
		return this.x + ',' + this.y + (this.z ? ',' + this.z : '');
	}

	equals(other) {
		return this.x === other.x && this.y === other.y && this.z === other.z;
	}

	/**
	 * 
	 * @param {string} string 
	 * @returns Vec
	 */
	static fromString(string) {
		const parts = string.split(',').nums();
		return new Vec(...parts);
	}
}
