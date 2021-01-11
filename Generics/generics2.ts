function bind<T, U extends any[], R>(
  func: (arg1: T, ...rest: U) => R,
  value: T,
): (...args: U) => R {
  return (...args: U) => func(value, ...args);
}

const add = (x: number, y: number): number => x + y;

const add1 = bind(add, 3);

// この呼び出しでは T = number, U = [number], R = number と推論される
console.log(add1(5));

