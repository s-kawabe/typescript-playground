// タプルTを受け取り、そのタプルの長さを返す型Length<T>を実装します。

type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
const spaceY = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX> // expected 5

// my answer
// type Length<T> = 

// other developer
// LookUp typeを用いてlengthプロパティの実態を取得し、numberのタプルを返す!!
type Length<T extends any[]> = T["length"] 

