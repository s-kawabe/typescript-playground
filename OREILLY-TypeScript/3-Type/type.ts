/* 
*  unknownの挙動
*/
let a: unknown = 30 // 格納する際は何でもOK
let b = a === 123
let c = a + 10  // この時点でaはnumber型を認識できていない
if(typeof a === 'number') { // 型ガードをしなければいけない
  let d = a + 10
}x

// unionの中にunknownが1つでもあればunknown型になる
type CheckUnknown = unknown | number | string
// unionの中にanyが1つでもあればany型になる
type CheckAny = any | number | string


/* 
*  bigintについて
*/
let bi = 1234n    // bigint
const rBi = 5678n  // 5678nc

/*
* 合併型と交差型
*/
type Cat = { name: string, purrs: boolean }
type Dog = { name: string, barks: boolean, wags: boolean }
type CatOrDogOrBoth = Cat | Dog
type CatAndDog = Cat & Dog

// Cat
let testtt: CatOrDogOrBoth = {
  name: 'Bonkers',
  purrs: true,
}

// Dog
testtt = {
  name: 'Domino',
  barks: true,
  wags: true
}

// 両方
testtt = {
  name: 'Donkers',
  barks: true,
  purrs: true,
  wags: true,
}

// Cat and Dog
let test2: CatAndDog = { // 以下のプロパティが1つでも欠けるとエラー
  name: 'Donkers',
  barks: true,
  purrs: true,
  wags: true,
}


