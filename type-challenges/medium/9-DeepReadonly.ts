// オブジェクトのすべてのパラメーター（およびそのサブオブジェクトを再帰的に）を読み取り専用にするDeepReadonly<T>を実装します。

// この課題ではオブジェクトのみを扱っていると想定してください。配列、関数、クラスなどは考慮する必要はありません。
// しかし、可能な限り様々なケースをカバーすることで、自分自身に挑戦することができます。

// Example
type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey' 
}

type Todo = DeepReadonly<X> // should be same as `Expected`

// my
type DeepReadonly<T extends Object> = {
  readonly [P in keyof T]: T[P] extends Object ? DeepReadonly<T[P]> : T[P]
}

// other
type DeepReadonly2<T> = { readonly [K in keyof T]: keyof T[K] extends undefined ? T[K] : DeepReadonly<T[K]>};
