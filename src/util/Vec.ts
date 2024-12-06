import '../types.d.ts';

export default class Vec {
    static #UP    = new Vec( 0, -1);
    static #DOWN  = new Vec( 0,  1);
    static #LEFT  = new Vec(-1,  0);
    static #RIGHT = new Vec( 1,  0);

    static up    = () => Vec.#UP.clone();
    static down  = () => Vec.#DOWN.clone();
    static left  = () => Vec.#LEFT.clone();
    static right = () => Vec.#RIGHT.clone();

	constructor(
        public x: number,
        public y: number,
        public z: number = 0,
    ) {}

	clone() {
		return new Vec(this.x, this.y, this.z);
	}

	copyFrom(other: Vec) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
	}

	mult(n: number) {
		this.x *= n;
		this.y *= n;
		this.z *= n;
		return this;
	}

	add(other: Vec) {
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
		return this;
	}

	sub(other: Vec) {
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;
		return this;
	}

	distSq(other: Vec) {
		return (this.x - other.x) ** 2 + (this.y - other.y) ** 2 + (this.z + other.z) ** 2;
	}

	dist(other: Vec) {
		return this.distSq(other).sqrt();
	}

    /**
     * Manhattan distance from this point to the other
     */
	manDist(other: Vec) {
		return Math.abs(this.x - other.x) + Math.abs(this.y - other.y) + Math.abs(this.z - other.z);
	}

	toString() {
		return this.x + ',' + this.y + (this.z ? ',' + this.z : '');
	}

	equals(other: Vec) {
		return this.x === other.x && this.y === other.y && this.z === other.z;
	}

    isUp() {
        if (this.z !== 0) throw new Error('z must be 0 for isUp');
        return this.x === Vec.#UP.x && this.y === Vec.#UP.y;
    }

    isDown() {
        if (this.z !== 0) throw new Error('z must be 0 for isDown');
        return this.x === Vec.#DOWN.x && this.y === Vec.#DOWN.y;
    }

    isLeft() {
        if (this.z !== 0) throw new Error('z must be 0 for isLeft');
        return this.x === Vec.#LEFT.x && this.y === Vec.#LEFT.y;
    }

    isRight() {
        if (this.z !== 0) throw new Error('z must be 0 for isRight');
        return this.x === Vec.#RIGHT.x && this.y === Vec.#RIGHT.y;
    }

    turnRight() {
        if (this.isUp()) {
            this.copyFrom(Vec.#RIGHT);
        } else if (this.isRight()) {
            this.copyFrom(Vec.#DOWN);
        } else if (this.isDown()) {
            this.copyFrom(Vec.#LEFT);
        } else if (this.isLeft()) {
            this.copyFrom(Vec.#UP);
        } else {
            throw new Error('turnRight only implemented for up/down/left/right');
        }
    }

    turnLeft() {
        if (this.isUp()) {
            this.copyFrom(Vec.#LEFT);
        } else if (this.isLeft()) {
            this.copyFrom(Vec.#DOWN);
        } else if (this.isDown()) {
            this.copyFrom(Vec.#RIGHT);
        } else if (this.isRight()) {
            this.copyFrom(Vec.#UP);
        } else {
            throw new Error('turnLeft only implemented for up/down/left/right');
        }
    }

    getDirection(): 'up' | 'down' | 'left' | 'right' {
        if (this.isUp()) {
            return 'up';
        } else if (this.isLeft()) {
            return 'left';
        } else if (this.isDown()) {
            return 'down';
        } else if (this.isRight()) {
            return 'right';
        } else {
            throw new Error(`getDirection called on vec ${this.toString()}`);
        }
    }

	static fromString(s: string) {
		const [x, y, z] = s.split(',').nums();
		return new Vec(x, y, z);
	}
}
