/**
 * @class
 * @template T
 */
export default class Grid {
	/**
	 * @param {number} width
	 * @param {number} height
	 * @param {T|(x: number, y: number)=>T} filler
	 */
	constructor(width, height, filler = 0) {
		this.width = width;
		this.height = height;

		this.items = [];

		for (let y = 0; y < height; ++y) {
			for (let x = 0; x < width; ++x) {
				this.items.push(new GridItem(x, y, typeof filler === 'function' ? filler(x, y) : filler, this));
			}
		}
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	getIndex(x, y) {
		return x + this.width * y;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {GridItem<T>}
	 */
	get(x, y) {
		return this.items[this.getIndex(x, y)];
	}

	/**
	 * @param {(value, x: number, y: number) => boolean} fn
	 */
	filter(fn) {}
}

/**
 * @class
 * @template T
 */
export class GridItem {
	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {T} value
	 * @param {Grid<T>} owner
	 */
	constructor(x, y, value, owner) {
		this.x = x;
		this.y = y;
		this.value = value;
		this.owner = owner;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {GridItem<T>|undefined}
	 */
	getRelative(x, y) {
		return this.owner.get(this.x + x, this.y + y);
	}

	/**
	 * @returns {GridItem<T>[]}
	 */
	getNeighbours() {
		const out = [];
		for (let j = -1; j <= 1; ++j) {
			for (let i = -1; i <= 1; ++i) {
				if (i === 0 && j === 0) continue;
				const v = this.owner.get(this.x + i, this.y + j);
				v ? out.push(v) : 0;
			}
		}
		return out;
	}

	isEdge() {
		return this.x === 0 || this.x === this.owner.width || this.y === 0 || this.y === this.owner.height;
	}
}
