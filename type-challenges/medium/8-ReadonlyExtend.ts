// 2つの型引数TとKを取るMyReadonly2<T, K>を実装します。
// Kが指定されている場合は、Tの中のKのプロパティのみを読み取り専用にします。
// Kが指定されていない場合は、通常のReadonly<T>と同様に、すべてのプロパティを読み取り専用にします。

// example
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo2: MyReadonly2<Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

todo2.title = "Hello"; // Error: cannot reassign a readonly property
todo2.description = "barFoo"; // Error: cannot reassign a readonly property
todo2.completed = true; // OK


// type MyReadonly2<T extends Object, K extends any> = K extends keyof T 
// ? /*Kだけreadonly*/ 
// : /*全部readonly

// Kを指定しなければKはkeyof Tとなる → ＆前後で返すものが同じになるはず
type MyReadonly2<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
} & { readonly [P in K]: T[P] }