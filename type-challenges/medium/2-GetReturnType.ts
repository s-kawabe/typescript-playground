// 組み込みの型ユーティリティReturnType<T>を使用せず、Tの戻り値の型を取得する型を実装します。

// example
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // should be "1 | 2"

type MyReturnType<T extends Function> = T extends (...args: any[]) => infer R
  ? R
  : any;
