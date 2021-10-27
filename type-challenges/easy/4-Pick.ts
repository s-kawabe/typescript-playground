// 組み込みの型ユーティリティPick<T, K>を使用せず、TからKのプロパティを抽出する型を実装します。

// 例
interface Todo1 {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo1, 'title' | 'completed'>

const todo1: TodoPreview = {
    title: 'Clean room',
    completed: false,
}

// my answer 🙅‍♂️ 
// type MyPick<I, K> = {
//   [V in K]: I[V]
// }

// other developer
// KはIのプロパティに必ず含まれている必要がある
// → extends keyof IによってKはIのプロパティ名であることを指定する
type MyPick<I, K extends keyof I> = {
  [V in K]: I[V]
}