// 組み込みの型ユーティリティOmit<T, K>を使用せず、TのプロパティからKを削除する型を実装します。

// example
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview2 = MyOmit<Todo, "description" | "title">;

const todo: TodoPreview2 = {
  completed: false,
};

// answer
// excludeを使って、「元のキーからあるキーを除いたもの」という型を作る必要がある
type MyExclude2<T, U> = T extends U ? never : T;
// IはKの型の一部であることを示す
type MyOmit<I extends Object, K extends keyof I> = {
  [V in MyExclude2<keyof I, K>]: I[V];
};

// Tips
type Piyo = "a" | "b" | "c";
type Piyo2 = "a" | "b" | "c" | "d";

// PiyoはPiyo2の型の一部であるかどうか、 PiyoはPiyo2の型としてみても成立するかどうか
type Boooolean = Piyo extends Piyo2 ? true : false;
