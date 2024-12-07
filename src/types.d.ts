declare interface Array<T> {
    sum(): T;
    product(): T;
    prod(): T;
    numbers(): number[];
    nums(): number[];
    strings(): string[];
    strs(): string[];
    deduped(): T[];
    counts(): { [key in typeof this]: number };
    max(): T;
    min(): T;
    minMax(): { min: T, max: T };
    avg(): T;
    sorted(): T[];
    ror(): T[];
    rol(): T[];
    truthy(): T[];
    falsy(): T[];
    copy(): T[];
    deepCopy(): T[];
    count(valueOrFunction: (t: T) => boolean): T[];
    count(valueOrFunction: T): T[];
    split(sep: T): T[][];
    permute(): T[];
    chunk(size: number): T[][];
    choose(chooseAmt: number): T[][];
    first(fn: (t: T, i: number, array: typeof this) => T | undefined): T[][];
    insert(index: number, ...items: T[]): void;
    repeat(n: number): T[];
    unique(): T[];

    /**
     * Converts from `[A,B][]` to `[A[], B[]]`
     *
     * requires `T` to be `[A, B]`
     */
    unzip<A, B, U>(): T extends ([A, B] | U[]) ? [T[0][], T[1][]] : never;

    /**
     * Convert from `[A[], B[]]` to `[A, B][]`
     * requires self to be  to be `[A[], B[]]`
     */
    zip<A, B>(): this extends [A[], B[]] ? [this[0][0], this[1][0]][] : never;

    /**
     * Zip two arrays
     */
    zip<U>(other: U[]): [T, U][];

    // Make map handle tuples a bit
    map<U>(mapper: (a: T, i: number, array: typeof this) => U): this extends [T, T] ? [U, U] : U[];
}

declare interface String {
    matches(regex: RegExp): boolean;
    charCount(): Record<string, number>;
    permute(): string[][];
    isLower(): string;
    isUpper(): string;
    lines(): string[];
    copy(): void;
    is_palendrome(): boolean;
}

declare interface Number {
    sqrt(): number;
    copy(): void;
}

declare interface Object {
    getEntries(): [string, unknown][];
    keys(): string[];
    values(): unknown[];
    log(prefix?: string): void;
    cp(): void;
}

declare interface Console {
    dbg(...args: unknown[]): void;
}
