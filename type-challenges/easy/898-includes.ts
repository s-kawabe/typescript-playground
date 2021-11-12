// Array.includes型システムにJavaScript関数を実装します。型は2つの引数を取ります。
// 出力はブール値trueまたはfalse。である必要があります。

// examples
type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
type isPillarMen2 = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">; // expected to be `true`
type HumansTaple = ["Kars", "Esidisi", "Wamuu", "Santana"];

// My answer
// type Includes<T , U> = U extends keyof T ? true : false

// other answer
type Includes<T extends unknown[], U> = U extends T[number] ? true : false;

// タプル配列をUnionに変換するにはこのように指定する
type Hoge = HumansTaple[number];
