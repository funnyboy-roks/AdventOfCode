declare interface Array<T> {
    sum(start?: T): T;
    product(start?: T): T;
    prod(start?: T): T;
    numbers(): number[];
    nums(): number[];
    strings(): string[];
    strs(): string[];
    deduped(): T[];
    counts(): Map<T, number>;
    max(): T;
    min(): T;
    minMax(): { min: T, max: T };
    avg(): T;
    sort(comparator?: null | ((a: T, b: T) => number), reversed?: boolean): T[];
    sortByKey<U>(keyFn: (a: T) => U, reversed?: boolean): T[];
    sorted(reversed?: boolean): T[];
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
    first(fn: (t: T, i: number, array: this) => T | undefined): T[][];
    insert(index: number, ...items: T[]): void;
    repeat(n: number): T[];
    unique(): T[];
    uniqueByKey<U>(fn: (value: T) => U): T[];
    filter_map<T>(fn: <T>(t: this[number], i: number, array: this) => T | undefined): T[];

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
    map<U>(mapper: (a: T, i: number, array: this) => U): this extends [T, T] ? [U, U] : U[];

    any(predicate: (value: T, index: number, array: this) => boolean): boolean;
    all(predicate: (value: T, index: number, array: this) => boolean): boolean;

    transpose<U>(this: T extends Array<U> ? Array<Array<U>> : never): Array<Array<U>>;
}

declare interface String {
    matches(regex: RegExp): boolean;
    charCount(): Record<string, number>;
    permute(): string[][];
    isLower(): boolean;
    isUpper(): boolean;
    lines(): string[];
    copy(): void;
    is_palendrome(): boolean;
}

declare interface Number {
    sqrt(): number;
    copy(): void;
    digits(base?: number): number;
    sign(): -1 | 0 | 1;
}

declare interface Object {
    log(prefix?: string): void;
}

declare interface Console {
    dbg(...args: unknown[]): void;
    success(...args: unknown[]): void;
}
