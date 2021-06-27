// 組み込みの型ユーティリティExclude <T、U>を使用せず、Uに割り当て可能な型をTから除外する型を実装します。
// (exclude = T - U の結果？)


type TodoExclude = MyExclude<'title' | 'completed' | 'hoge', 'title' | 'completed'>

type Hogeee = Exclude<'title' | 'completed' | 'hoge', 'title' | 'completed'>

// my answer
// type MyExclude<T, U> = T extends U ? never : T;

// other developer
// TがUをextendsできるなら(TがUに入れられるなら)、never、そうでないならTを返す
// Tを返すなら普通にTがそのまま返るのだと思ったが、違うみたい
// conditional typeの仕様でTが勝手に推論される？(左のTと右のTは違う)
// 「TがUに入れられないなら」なので、その「入れられない」部分が推論され右辺のTに入ってくるのかもしれない ■□■
type MyExclude<T, U> = T extends U ? never : T;

// そもそもexcludeは: 大元の列挙的な物から一部分を取り除きたい
// →つまり取り除きたいものが大元より多ければ neverになる

// T extends U ? never : T で参考演算子でfalseになりTを返す時
// なぜかTとUの差分(?)の型で返っていくのが謎。

type AAA = 'title' | 'completed' | 'hoge'
type BBB = 'title' | 'completed'

type MyUnion = AAA | BBB
type MyIntersection = AAA & BBB
type MyExtends = AAA extends BBB ? never : AAA