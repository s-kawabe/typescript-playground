// 組み込みの型ユーティリティReadonly<T>を使用せず、T のすべてのプロパティを読み取り専用にする型を実装します。実装された型のプロパティは再割り当てできません。

// 例
interface Todo2 {
  title: string
  description: string
}

const todo2: MyReadonly<Todo2> = {
  title: "Hey",
  description: "foobar"
}

todo2.title = "Hello" // Error: cannot reassign a readonly property
todo2.description = "barFoo" // Error: cannot reassign a readonly property

// my answer
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
} 

// other developer answer
// type MyReadonly<T> = {readonly [K in keyof T]:T[K]}