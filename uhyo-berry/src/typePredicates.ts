// ⭐ ユーザー定義型ガード
// 型の絞り込みを自由に行うための仕組み。
// typeof演算子やリテラル型, タグ付きunionといった手法で複雑な条件で絞り込みを行うと
// TypeScriptコンパイラが理解できる範囲を超えてしまうことがある。

// const isStringOrNumber = (val: unknown): boolean => {
// ではない →型の絞り込みだとみなされない
const isStringOrNumber = (val: unknown): val is string | number => {
  return typeof val === "string" || typeof val === "number"
}

const something: unknown = 123;

if(isStringOrNumber(something)) {
  // ここではstring | number
  console.log(something.toString())
}

// ⭐ asserts型述語
// 「asserts 引数名 is 型」という形式を使うと「その関数が無事に終了すれば引数名は型である」という意味になる
type Human = {
  type: "Human"
  age: number
  name: string
}
type AssertHuman = (val: any) => asserts val is Human
const assertHuman: AssertHuman = (val) => {
  if(val == null) {
    throw new Error("Given value is null or undefined")
  }
  if(val.type !== "Human" || typeof val.age !== "number" || typeof val.name !== "string") {
    throw new Error("Given value is not a Human")
  }
}

// Assertions require every name in the call target to be declared with an explicit type annotation.
// https://qiita.com/suin/items/e226c42a19e1ddd39d05
const checkAndUseHuman = (val: unknown): Human["name"] => {
  assertHuman(val)

  // ここではvalはHuman型になる
  const name = val.name
  return name
}