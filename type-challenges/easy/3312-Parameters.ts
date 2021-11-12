// 組み込みのParametersを実装する

function foo(arg1: string, arg2: number): string {
  return `${arg1}, ${arg2}`;
}
function bar(): void {}

type Foo = MyParameters<typeof foo>; // [string, number]
type Bar = MyParameters<typeof bar>; // []

// answer
// inferはその部分にあたる方を推論させて返り値などに使いたい場合に使用する
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : never;
