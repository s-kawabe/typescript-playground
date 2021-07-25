# 5章 クラスとインターフェースまとめ

**TypeScriptにおけるクラスの登場人物**
- アクセス修飾子
- プロパティ初期化子
- ポリモーフィズム
- デコレーター
- インターフェース
 ...etc

このうちアクセス修飾子、インターフェース、ジェネリック等の機能については
TypeScriptコンパイル時のみの機能であり、
JavaScriptにコンパイル後は何の痕跡も残さない。

**章内で説明がない用語の解説**
- **オーバーライド**
親クラスで定義されたメソッドについて、継承先の子クラスで同じ名前の
メソッドを定義し機能やプロパティを追加すること。

- **オーバーロード**
同クラス内で引数の個数や型が異なる同じ名前のメソッドを定義すること。

- **コンストラクタ**-
クラス内に定義される特殊なメソッド。
そのクラスがインスタンス化(new)される際に呼び出される。

- **インスタンス**
クラスをnewして変数に格納したもの。
インスタンス化した変数から、クラス内のメソッドやプロパティにアクセスできる。
```ts
class Person {}
let person = new Person();
// personのことをインスタンスとかインスタンス変数と呼ぶ
```

## クラスと継承

```ts
type Color = 'Black' | 'White'
type Col = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

// ゲームのメインクラス
class Game {
  private piecies = Game.makePieces()

  private static makePieces() {
    return [
      new King('White', 'E', 1),
      new King('Black', 'E', 8),
      
      new Queen('White', 'D', 1),
      new Queen('Black', 'D', 8),
      
      // and more ...
    ]
  }
}

// 駒の抽象クラス - 継承のみに使用する
abstract class Piece {
  protected position: Position
  constructor(
    private readonly color: Color,
    col: Col,
    row: Row
  ){
    this.position = new Position(row, col)
  }

  moveTo(position: Position) {
    this.position = position
  }

  abstract canMoveTo(position: Position): boolean
}

// 位置を示すクラス
class Position {
  constructor(
    private row: Row,
    private col: Col,
  ) {}

  distanceFrom(position: Position) {
    return {
      row: Math.abs(position.row - this.row),
      col: Math.abs(position.col.charCodeAt(0) - this.col.charCodeAt(0))
    }
  }
}

// 駒の具体的なクラス - canMoveToをオーバーライドしないとエラーになる。
class King extends Piece {}
class Queen extends Piece {}
class Rook extends Piece {}
class Bishop extends Piece {}
class Knight extends Piece {}
class Pawn extends Piece {}
```

### アクセス修飾子
- `public`
どこからでもアクセス可能、何もつけない場合これがデフォルトのスコープになる。
- `protected`
このクラスとサブクラス(継承先)のインスタンスからアクセス可能。
- `private`
このクラスのインスタンスからのみアクセス可能。

コンストラクター内のアクセス修飾子によって、そのパラメーターを自動的に
同クラス内のthisに割り当てることが可能。

```ts
class Position {
  constructor(
    private row: Row,
    private col: Col,
  ) {}
}

// -- 上と同等
class Position {
  private row: Row
  private col: Col
  constructor(row: Row, col: Col) {
    this.row = row
    this.col = col
  }
}
```

### 抽象クラス
- `抽象クラス`
`abstract`キーワードをつけて宣言したクラス、
抽象クラスは直接インスタンス化しようとするとエラーになる。
直接インスタンス化はできないが、中にメソッドを定義することは可能。
- `抽象メソッド`
抽象クラス内で`abstract`キーワードつけて宣言した関数
この関数はサブクラスで必ずオーバーライドしなければエラーになる。

`Piece`クラスはそれぞれの具体的な駒に拡張されることを想定して作成されている。
そのため`Piece`クラスは直接インスタンス化して欲しくない。
このような場合に抽象クラスとして定義することでこの要求を満たすことができる。

```ts
abstract class Piece {
  constructor (
    ...
  )
}
```

### 静的メソッド
あるクラス内でstaticキーワードがついたメソッドは、属しているクラスの
インスタンスからは呼び出すことができない。
代わりにクラス名を指定して直接呼び出す。

```ts
// GameクラスのmakePiecesメソッド呼び出し
Game.makePieces()
```

(静的メソッド(staticメソッド)ではないメソッドは具象メソッドやインスタンスメソッドなどと呼ばれる)

## super
**super呼び出しとは**
子クラスが親クラスで定義されたメソッドをオーバーライドする場合
子クラスのインスタンスは`super.メソッド名`などのように呼び出すことで
オーバーライドされる前の親クラスオリジナルなメソッドを呼び出すことが可能。
上記を含めてsuperの主な用途は以下となる。
- 親メソッド呼び出し(`super.someMethod()`)
- 親コンストラクタ呼び出し(`super()`)
こちらはコンストラクタからのみ呼び出し可能。

```ts
class Human {
  public name: string
  public age: number

  constructor(
    name: string,
    age: number
  ) {
    this.name = name
    this.age = age
  }

  talk() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}

class Student extends Human {
  public job: string
  constructor(
    job: string,
    name: string,
    age: number
  ) {
    super(name, age) //⭐️
    this.job = job
  }

  talk() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.
      My job is ${this.job}.`)
  }

  talk2() {
    super.talk() //⭐️
  }
}
```

> superはクラスという概念を持つほとんどの言語でサポートされている。

## 型としてのthis
thisは値としての用途に加えて、同様な書き方で**型として使用することもできる。**
クラスを扱う際にthis型はメソッドの戻り値の型をアノテーションすることができる。

以下のような連鎖的に呼び出されるAPI(メソッドチェーン、ビルダーパターン等という)
を扱う場合の型定義に非常に役に立つ。

```ts
class Set {
  has(value: number): boolean {
    // valueがSetに存在すればtrueを返す
  }
  add(value: number): this {
    // valueをSetに追加し、追加後のSetを返す
  }
}

let set = new Set
set.add(1).add(2).add(3)
set.has(2) // true
set.has(4) // false
```

## インターフェース
### 型エイリアスとインターフェースの差
インターフェースをざっくり説明するならば、
型エイリアス同様、**型に名前をつけるための方法**

**(例)型エイリアスとインターフェースの定義と拡張方法**
- 型エイリアス
```ts
// 定義
type Sushi = {
  calories: number
  salty: boolean
  tasty: boolean
}

// 共通化と拡張
type Food = {
  calories: number
  tasty: boolean
}
type Sushi = Food & {
  salty: boolean
}
type Cake = Food & {
  sweet: boolean
}
```

- インターフェース
```ts
// 定義
interface Sushi {
  calories: number
  salty: boolean
  tasty: boolean
}

// 共通化と拡張
interface Food {
  calories: number
  tasty: boolean
}
interface Sushi extends Food {
  salty: boolean
}
interface Cake extends Food {
  sweet: boolean
}
```

**具体的な違い**
- 型エイリアスの方がより汎用的で、union型を用いている型エイリアスなどは
interfaceでは表現できない。 interfaceの左辺は必ず{}で表現しなければいけない。
- インターフェースを拡張(extends)する際は、拡張元のインターフェースが
拡張先のインターフェースに割り当て可能かどうかを確認する。
- 同じスコープ内に同じ名前のインターフェースが定義されている場合、
エラーにはならず暗黙的にマージが行われる。これを**宣言のマージ**という。

### 宣言のマージ
```ts
type TUser = {
  name: string
}
type TUser = {
  age: number // エラー Userが重複しています。
}

interface IUser {
  name: string
}
interface IUser {
  age: number // エラーにならない
}
// この時点でIUserはnameとage両方を持つ
```

### extendsとimplements
クラスを宣言する際に`implements`を使うと、そのクラスに特定のインターフェースを
満たさなければいけないという制約を与えることができる。
インターフェースをクラスに拡張することを`実装`という。

```ts
interface Animal {
  eat(food: string): void
  sleep(hours: number): void
}

// implements - 実装と呼ぶ
class Cat implements Animal { 
  eat(food: string) {
    // ...
  }
  sleep(hours: number) {
    // ...
  }
}
```

**その他特徴**
- インターフェースはアクセス修飾子やstaticキーワードを使うことはできない
- 継承(extends)と違い、実装(implements)は複数でも可能。

### インターフェースと抽象クラスの差
- `インターフェース`
インターフェースは、型エイリアスとほぼ同じ働きをする。
(また、コンパイル後のJavaScriptにはインターフェースは登場しない。)

- `抽象クラス`
ランタイムでコードを生成するため、JavaScriptコードでも生き残る。
抽象クラスからモデル化(具体化)できるのはクラスのみ。

## クラスは構造的に型付けされる
TypeScriptはクラスをその名前によってではなく、構造によって比較する。

## クラスは値と型の両方を宣言する
TypeScriptでは型と値の名前空間は別々に分けられる。
<u>同じスコープ内で同じ名前の型と値を生成してもエラーにならない。</u>

## ポリモーフィズム
**ポリモーフィズムの考え方**
> ある関数やメソッドなどが、引数や返り値の数やデータ型などの
> 異なる複数の実装を持ち、呼び出し時に使い分けるようにできること。

つまり、「汎用的な設計や実装を行って、何らかの処理を
共通化できるようにすることにより色々な恩恵を受けられます。」
というざっくりしたイメージなのだと思う。

> オブジェクト指向の3大要素
> - カプセル化
> - 継承
> - ポリモーフィズム

→ポリモーフィズムだけレベル感が違うような...🤔
あくまで抽象的な概念を示していて、その実現方法は言語やライブラリによって様々。

## mixin
mixinは、本来禁止されている`多重継承`を擬似的に実装する方法である。
複数の振る舞いやプロパティを1つのクラスの中にミックスすることを表す。

## デコレーター
TypeScriptにおいては未だ実験的な機能の一つ。
クラスやメソッドに対して「@名前」で関数を指定できる。
指定した関数にはクラスの情報を渡すことができる。

以下のようなデコレーターはクラスがインスタンス化されたときではなく、
**定義されたとき**に実行される。

```typescript
// class全体にもclass内部の部分的にも適用できる
// 場所によって引数が変わる
// Function → 内臓されているコンストラクタ関数
function Logging(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

// => Logging...
// => [Function: User]
@Logging
class User {
  name = 'Quill';
  constructor() {
    console.log('User was created.')
  }
}
```

完全に忘れたが、過去に勉強したデコレーターに関するメモ👇
https://github.com/s-kawabe/typescript-tutorial/tree/master/Decorator

## おまけ

> **「is-a」の関係**
> - Aという抽象はBのような具体を持つ。
> - BはAでもある、Aとも言える。
>
> のような関連性を持つ。
> (例: A→自動車 B→ベンツ,ランボルギーニ、ポルシェ)
>
> **「has-a」の関係**
> - AはBを持っている。
> - BはAの一部である。
>
> のような関連性を持つ。
> (例: A→PC B→ディスプレイ、キーボード、CPU)
