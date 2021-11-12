// Implement the type version of Array.unshift

// example
type Result2 = Unshift<[1, 2], 0>;

// asnwer
type Unshift<T extends any[], U> = [U, ...T];
