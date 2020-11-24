# Typescript
[参考](https://www.youtube.com/watch?v=F9vzRz6jyRk&t=28s)

# Typescript 型についてのメモ
## boolean
tscがどうやってbooleanを認識しているか？
→変数をマウスホバーすることで型情報が確認可能
```typescript
let hasValue: boolean = true;
```
---
## number
numberで整数、負数、不動小数すべてを表現  
```typescript
let count: number = 10;
let pi: number = 3.14;
let nega: number = -50;
```
---
## string
```typescript
let single: string = 'hoge';
let double: string = "hoge";
let back: string = `hoge`;
```
---
### 型注釈と型推論
#### 型注釈
以下の部分
let single<strong>: string</strong> = 'hoge'

#### 型推論
型注釈を書かなかった場合、tsが推測で型を認識する。
let hasValue = true;
→ コレは多分booleanだ！

### 結論
- 基本的には型推論、それ以外の初期化しない場合などに型注釈を用いる
- anyについては型注釈を用いる
---
## オブジェクトに型をつける
型注釈
```typescript
const person: {
  name: string;
  age: number;
} = {
  name: 'jack',
  age: 25
}
```
or 型推論で直接オブジェクトリテラルを記述するのがよい。

---
## 配列
型注釈あり（特定の型）
```typescript 
const fruits: string[] = ['Apple','Banana','Lemon']
```
型注釈あり（any型）
```typescript 
const fruits: any[] = ['Apple',3,'Banana','Lemon',5]
```
型注釈なし
```typescript
// Union型になる 
const fruits = ['Apple',3,'Banana','Lemon',5]
```
---
## Tuple
→要素が決まったオブジェクトのような配列を定義したい場合<br>
※明示的に型注釈をつける必要がある<br>
※初期値にのみ制限をかける。pushする際は制限が無い
```typescript
const book: [string, number, boolean] = ['business'. 1500, true]
```
---
## Enum
enumのリテラルに文字列を与えない場合、値は数値の連番でinitializeされる
```typescript
// enumの命名規則は以下のようにする
enum CoffeeSize {
  SHORT = 'SHORT',
  TALL = 'TALL',
  GRANDE = 'GRANDE',
  VENTI = 'VENTI'
}

const coffe = {
  hot: true,
  size: CoffeeSize.TALL
}
```
(enumのコンパイル後)
```typescript
// オブジェクトになる
var CoffeSize;
(function (CoffeSize) {
    CoffeSize["SHORT"] = "SHORT";
    CoffeSize["TALL"] = "TALL";
    CoffeSize["GRANDE"] = "GRANDE";
    CoffeSize["VENTI"] = "VENTI";
})(CoffeSize || (CoffeSize = {}));
```
---
## any
何でも入れることができる型
素のjavascriptと同じ動きになる
※なるべく使わないようにする

---

## unknown
anyと似ているが、anyより微妙に厳しくなっている
```typescript
let unknownInput: unknown = 20;
let anyInput: input = "hello";
let text: string;
text = anyInput;     // OK
text = unknownInput; // NG
// unknownを使用する際
if(typeof(unknownInput) === 'string') {
  text = unknownInput;
}
```

---
## union
複数の型を受け入れる
```typescript
// 変数
let unionType :number | string = 10;
unionType.toUpperCase(); // エラー
unionType = 'hello';
unionType.toUpperCase(); // エラーにならない

// 配列
let unionTypes: (number | string)[] = [21, 'hello'];
```
---
## リテラル
```typescript
const apple: 'apple' = 'hello' // エラー
const num: 20 = 30 // エラー

// ■ unionと同時に使う
// union + リテラル ≒ Enumのように扱える
let clothSize: 'small' | 'medium' | 'large' = 'large';

const cloth: {
  color: string;
  size: 'small' | 'medium' | 'large';
} = {
  color: 'white',
  size: 'medium' //or small or large
}
```
---
## TypeAlias
型に別名をつけて扱う
```typescript
type ClothSize = 'small' | 'medium' | 'large';
let clothSize: ClothSize = 'large';
// = let clothSize: 'small' | 'medium' | 'large' = 'large';
```
---
## 関数(宣言時)に型をつける
引数と戻り値につける
```typescript
// function add(num1[: 引数の型], num2[: 引数の型])[: 戻り値の型]
function add(num1: number, num2: number): number {
  return num1 + num2
}
```
引数の型推論　→　anyになる、やらない方がいい<br>
戻り値の型推論　→ 冗長になる場合以外は書く　

### 戻り値を返さない場合
```typescript
function sayHello(): void {
  console.log('Hello!');
}
// しかし、上記の場合undefinedは返却される

// しかし以下のように型注釈でundefinedを記述するのはtypescriptで許されていない
function sayHello(): undefined { }
```

### 戻り値は無いが明示的にreturnするパターン
```typescript
function sayHello(): void {
  console.log('Hello!');
  return;
}
// この場合であればsayHello()自体の型注釈はundefinedでもvoidでも許可される
```
---
## 関数(変数代入時)に型をつける
```typescript
const anotherAdd: (n1: number, n2: number) => number  // ←これは戻り値
  = function (num1: number, num2: number): number {
    return num1 + num2
  };

// 左辺か右辺どちらかに型情報があればOK
const anotherAdd: (n1: number, n2: number) => number  // ←これは戻り値
  = function (num1, num2) {
    return num1 + num2
  };
```

### アロー関数
```typescript
const doubleNumber: (num: number) => num = num * 2;
```
関数式の戻り値には :number ではなく => number で表現する

---
## コールバック関数に型をつける
```typescript
// cb: (num: number): void 
// →　引数に１つのnumberをとりnumberの戻り値を返す関数
function doubleAndHandle(num: number, cb: (num: number) => number) {
  const doubleNum = cb(num * 2);
  console.log(doubleNum);  
}

doubleAndHandle(21, doubleNum => {
  return doubleNum;
});

// コールバック関数の戻り値宣言にvoid,nullを設定すると
// その定義した関数は機能しなくなる
```

## never型
戻り値が無い関数につける型<br>
ver3〜登場している。<br>
neverを明示的に付与しない場合の型推論は「: void」
```typescript
// never 
function error(message: string): never {
  throw new Error(message);     
}

console.log(error('this is an error'));
```

