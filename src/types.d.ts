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
    count(valueOrFunction: (t: T) => bool): T[];
    count(valueOrFunction: T): T[];
    split(sep: T): T[][];
    permute(): T[];
    chunk(size: number): T[][];
    choose(chooseAmt: number): T[][];
    first(fn: (t: T, i: number, array: typeof this) => T | undefined): T[][];
    insert(index: number, ...items: T[]): void;
    repeat(n: number): T[];

    /**
     * Converts from `[A,B][]` to `[A[], B[]]`
     *
     * requires `T` to be `[A, B]`
     */
    unzip(): [T[0][], T[1][]];

    /**
     * Convert from `[A[], B[]]` to `[A, B][]`
     * requires self to be  to be `[A[], B[]]`
     */
    zip(): [this[0][0], this[1][0]][];

    /**
     * Zip two arrays
     */
    zip<U>(other: U[]): [T, U][];
}

declare interface String {
    matches(regex = /.*/): bool;
    charCount(): Record<string, number>;
    permute(): string[][];
    isLower(): string;
    isUpper(): string;
    lines(): string[];
    copy(): void;
    is_palendrome(): bool;
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
