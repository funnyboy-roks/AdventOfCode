import '../types.d.ts';

export default class Vec {
    static ZERO  = new Vec( 0,  0);
    static UP    = new Vec( 0, -1);
    static DOWN  = new Vec( 0,  1);
    static LEFT  = new Vec(-1,  0);
    static RIGHT = new Vec( 1,  0);
    static MIN = new Vec(-Infinity,  -Infinity);
    static MAX = new Vec(Infinity,  Infinity);

	constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly z: number = 0,
    ) {}

    with_x(x: number) {
        return new Vec(
            x,
            this.y,
            this.z,
        );
    }

    with_y(y: number) {
        return new Vec(
            this.x,
            y,
            this.z,
        );
    }

    with_z(z: number) {
        return new Vec(
            this.x,
            this.y,
            z,
        );
    }

    to(other: Vec) {
        return other.sub(this);
    }

	mult(n: number) {
        return new Vec(
            this.x * n,
            this.y * n,
            this.z * n,
        );
	}

	add(other: Vec) {
        return new Vec(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z,
        );
	}

	sub(other: Vec) {
        return new Vec(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z,
        );
	}

	distSq(other: Vec) {
		return (this.x - other.x) ** 2 + (this.y - other.y) ** 2 + (this.z - other.z) ** 2;
	}

	dist(other: Vec) {
		return this.distSq(other).sqrt();
	}

	lenSq() {
		return this.x ** 2 + this.y ** 2 + this.z ** 2;
	}

	len() {
        const lenSq = this.lenSq();
        if (lenSq === 1 || lenSq === 0) return lenSq;
		return lenSq.sqrt();
	}

	magSq() { return this.lenSq(); }
	mag() { return this.len(); }

    /**
     * Manhattan distance from this point to the other
     */
	manDist(other: Vec) {
		return Math.abs(this.x - other.x) + Math.abs(this.y - other.y) + Math.abs(this.z - other.z);
	}

	toString(): string {
		return this.x + ',' + this.y + (this.z ? ',' + this.z : '');
	}

	valueOf(): symbol {
		return Symbol.for(this.toString());
	}

    cmp(other: Vec): number {
        return this.x - other.x || this.y - other.y || this.z - other.z;
    }

	equals(other: Vec) {
		return this.x === other.x && this.y === other.y && this.z === other.z;
	}

    isUp() {
        if (this.z !== 0) throw new Error('z must be 0 for isUp');
        return this.x === 0 && this.y < 0;
    }

    isDown() {
        if (this.z !== 0) throw new Error('z must be 0 for isDown');
        return this.x === 0 && this.y > 0;
    }

    isLeft() {
        if (this.z !== 0) throw new Error('z must be 0 for isLeft');
        return this.x < 0 && this.y === 0;
    }

    isRight() {
        if (this.z !== 0) throw new Error('z must be 0 for isRight');
        return this.x > 0 && this.y === 0;
    }

    isVert() {
        return this.isUp() || this.isDown();
    }

    isHoriz() {
        return this.isRight() || this.isLeft();
    }

    turnRight() {
        const mag = this.mag();
        if (this.isUp()) {
            return Vec.RIGHT.mult(mag);
        } else if (this.isRight()) {
            return Vec.DOWN.mult(mag);
        } else if (this.isDown()) {
            return Vec.LEFT.mult(mag);
        } else if (this.isLeft()) {
            return Vec.UP.mult(mag);
        } else {
            throw new Error('turnRight only implemented for up/down/left/right');
        }
    }

    turnLeft() {
        const mag = this.mag();
        if (this.isUp()) {
            return Vec.LEFT.mult(mag);
        } else if (this.isLeft()) {
            return Vec.DOWN.mult(mag);
        } else if (this.isDown()) {
            return Vec.RIGHT.mult(mag);
        } else if (this.isRight()) {
            return Vec.UP.mult(mag);
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

    min(other: Vec): Vec {
        return new Vec(
            Math.min(this.x, other.x),
            Math.min(this.y, other.y),
            Math.min(this.z, other.z),
        );
    }

    max(other: Vec): Vec {
        return new Vec(
            Math.max(this.x, other.x),
            Math.max(this.y, other.y),
            Math.max(this.z, other.z),
        );
    }

    within(min: Vec, max: Vec): boolean {
        return this.x >= min.x && this.y >= min.y && this.z >= min.z
        && this.x <= max.x && this.y <= max.y && this.z <= max.z;
    }

	static fromString(s: string) {
        if (s === 'up') return Vec.UP;
        if (s === 'down') return Vec.DOWN;
        if (s === 'left') return Vec.LEFT;
        if (s === 'right') return Vec.RIGHT;
		const [x, y, z] = s.split(',').nums();
		return new Vec(x, y, z);
	}
}
