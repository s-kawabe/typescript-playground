// JavaScript のArray.concat関数を型システムに実装します。
// この型は 2 つの引数を受け取り、受け取ったイテレータの要素を順に含む新しい配列を返します。

// example
type Result = Concat<[1], [2]>; // expected to be [1, 2]

// my answer
// 型の文脈でもスプレッド構文のようなものが有効
// unknownの箇所は実際、ユースケースによってより厳密にしたほうがよい
type Concat<A1 extends unknown[], A2 extends unknown[]> = [...A1, ...A2];


