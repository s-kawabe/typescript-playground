// Implement the generic version of Array.push

// examples
type Result = Push<[1, 2], "3">; // [1, 2, '3']

// answer
type Push<T extends any[], U> = [...T, U];
