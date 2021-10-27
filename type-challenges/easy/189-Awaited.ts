// Promise ライクな型が内包する型をどのように取得すればよいでしょうか。 
// 例えば、Promise<ExampleType>という型がある場合、
// どのようにして ExampleType を取得すればよいでしょうか。

// my anser
// ....

// other developer
// => inferを使用することでPromiseの中身を推論できる
// (inferはextendsによる型分岐を使用した際の型の推論に用いられる)
type Awaited<T extends Promise<unknown>> = T extends Promise<infer U> ? U : never;


// example
type APIResponse = {
  id: string;
  name: string;
}

// -> Hoge: APIResponse (Promiseが取り除かれる)
type Hoge = Awaited<Promise<APIResponse[]>>