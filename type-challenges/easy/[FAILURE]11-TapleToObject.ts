// タプルを受け取り、その各値のkey/valueを持つオブジェクトの型に変換する型を実装します。

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

// my answer
// type Tuple = typeof tuple
// type TupleKey = keyof Tuple

// type TupleToObject<T> = {
//   [V in keyof T]: V
// }

// other developer answer
// ジェネリクスTが何らかの配列であることを示す
// MappedTypesにおいて配列型をinの右に指定する場合、T[number]という指定が必要になる
type TupleToObject<T extends readonly string[]> = {
  [P in T[number]]: P
}