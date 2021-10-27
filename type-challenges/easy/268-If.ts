// 条件値C、 Cが truthy である場合の戻り値の型T、Cが falsy である場合の戻り値の型Fを受け取るIfを実装します。
// 条件値C はtrueかfalseのどちらかであることが期待されますが、T と F は任意の型をとることができます。

// example 
type A = If<true, 'a', 'b'>; // expected to be 'a'
type B = If<false, 'a', 'b'>; // expected to be 'b'

// my answer
type If<C extends boolean, T, F> = C extends true ? T : F;