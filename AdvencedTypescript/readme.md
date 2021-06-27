# TypeScriptの応用的なテクニック

## インターセクション型
&を用いて２つのTypeAlias(又はinterface)を合わせた
型を用意する
```typescript
type Engineer = {
  name: string;
  role: string;
}

type Blogger = {
  name: string;
  follower: number;
}

type EngineerBlogger = Engineer & Blogger;
// (interfaceでの表現)
// interface EngineerBlogger extends Engineer, Blogger { }

const tom: EngineerBlogger = {
  name: 'tom',
  role: 'general',
  follower: 300
}
```
インターセクション型を用いてinterfaceを結合する時、
同じプロパティ名で異なる型がそれぞれに存在する場合は
合体させたあとはnever型になる。

union型でinterfaceを結合する場合の同様の場合は
その異なる名前のプロパティはnever型でなくunion型になる

---

## TypeGuard
何の型なのかを調べる方法

### typeof
型を調べる
標準の7つの型までしか調べない
(Objectの詳しい情報はわからない)
```typescript
function toUpperCase(x: string | number) {
  if(typeof x === 'string') {
    return x.toUpperCase();
  }
  return '';
}
```

- 便利なtypeof使用法
```typescript
// Peterオブジェクト(or クラス)の型情報を変数に格納する
type PeterType = typeof Peter;
```

### in
特定のメンバーがクラスに属しているか調べる
```typescript
type NomadWorker = Engineer | Blogger;
function describeProfile(nomad: NomadWorker) {
  // この時点：nomadはnameのみにアクセスできる
  if('role' in nomad) {
    // この時点：nomadはroleにもアクセスできる
  }
  if('follower' in nomad) {
    // この時点：nomadはfollowerにもアクセスできる
  }
}
```

### instanceof
特定のインスタンスが特定のクラスから生成されたものか調べる
```typescript
type Pet = Dog | Cat | Bird;
function havePer(pet: Pet) {
  if(pet instanceof Bird) {
    // 引数petがBirdだった場合のみ
  }
}

```
---

## タグ付きUnion
一種のデザインパターン
Unionにタグをつけて型を絞り込む方法
```typescript
type Dog = {
  kind: 'Dog' = 'Dog'
}

type Bird = {
  kind: 'Bird' = 'Bird'
}

type Pet = Dog | Bird;
function test(pet: Pet) {
  // pet.kindは両方に持っている為、型を特定できる
  switch(pet.kind) { 
    case: 'Dog'  
    case: 'Bird'
  }
}
```

以下の応用は値があるかもしれないし無いかもしれないことを表すoptionの型を
タグ付きUnionで表現。
タグ付きUnionを絞り込む方法としてはswitchを使うのが
拡張性に長けていてより適切。

```ts
// タグ付きUnion応用
interface Some<T> {
  type: 'Some',
  value: T;
}

interface None {
  type: 'None'
}

type Option<T> = Some<T> | None;

function map<T, U>(obj: Option<T>, f: (obj: T) => U): Option<U> {
  switch (obj.type) {
    case 'Some':
      return {
        type: 'Some',
        value: f(obj.value)
      }
    case 'None':
      return {
        type: 'None'
      }
  }
}
```
---

## 型アサーション
document.getElementById('input') の型は HTMLElement | null

<strong>jsxではasが推奨される（<>は紛らわしいので不適切）</strong>
```typescript
// <>を用いる→キャストするイメージ 
const input = <HTMLInputElement>document.getElementById('input');
input.value = 'Hello Initial Content'

// asを用いる
const input2 = document.getElementById('input') as HTMLInputElement;
input.value = 'Hello Initial Content'

```
---

## Non-null assertion operator
nullを返す可能性のあるものの末尾につけて、nullを拒否する
```typescript
document.getElementById('input')!
// == document.getElementById('input') as HTMLElement
```
---

## index signature
interfaceを実装したオブジェクトのプロパティを追加できる
```typescript
interface Designer {
  name: string;
  // interfaceに以下を定義する
  [index: string]: string;
}
const designer: Designer = {
  name: 'mikel',
  nickName: 'mike'
  // NG
  // age: 12,
}
```
---

## 関数のオーバーロード
union型を引数にとる関数のそれぞれの引数が確定している場合に
戻り値もそれに沿って確定させる方法
```typescript
// 使用する場合はオーバーロード先の関数の取りうる引数全てを列挙しなければいけない
function checkType(type: string): string
function checkType(type: number): number
function checkType(type: string | number) {
  if(typeof type === 'string') {
    return type.toUpperCase();
  } else {
    return type;
  }
}
const refStr = checkType('hello');
const refNum = checkType(30);
```
---

## Optional Cheining
Optional propertyの応用
プロパティがあったら返す、なくてもundifinedを返す
```typescript
interface DownloadedData {
  id: number;
  // Optional property
  user?: {
    name?: {
      first: string;
      last: string;
    }
  };
}

const downloadedData: DownloadedData = {
  id: 1
}

// Optional chaining  
console.log(downloadedData.user?.name); // => undifined
```
---

## Nullish Coalescing
undefinedを検査する
```typescript
// downloadedData.userがundifinedだった場合のみ 'no-user' を返す
// (or演算子 || は前者がfalthyなら全て評価しないので異なる)
const userData = downloadedData.user ?? 'no-user';
```
---

## LookUp型
interfaceのプロパティ名を指定して、型情報を取得する
```typescript
interface DownlodedData {
  id: number;
  name: string;
  age: number;
}

type id = DownloadedData['id']
// id => number
```
---

## REST ParameterにTupleを使用する
タプル型には最後らへんの配列をまとめるレストパラメータとして型を指定できる。
新しいTypeScriptではこれが後ろじゃなくてもよくなった。
最後がレストパラメータ、かつその前にOptionalがある場合は
その前のOptionalがない場合にレストの値を指定することはできない
```typescript
function advancedFnc(...args: [number, string, boolean, ...number[]]) {

}

advancedFnc(0,'hoge',true,3,5,6,7)
```
---

## constアサーション
型注釈無しで型に対して具体的なカプセル化を施せるキーワード
- readonlyを付与
- 型推論が通常のプリミティブ型でなくリテラル型になる

例１
```typescript
const milk = 'milk' as const;
let drink = milk;
const array = [10,20] as const;

const peter = {
  name: 'Peter',
  age: 38
} as const;
// 以下と同義
// const peter: {
//   readonly name: 'Peter';
//   readonly age: 38;
// } = {
//   name: 'Peter',
//   age: 38
// };
```
---

例２
```typescript
const tables = ['users', 'posts', 'comments']
// tablesの型　→ string[] 

const tables2 = ['users', 'posts', 'comments'] as const;
// tables2の型 → readonly ["users","posts","comments"]
```
---

## inferキーワード
inferは日本語に表すと「推論」。

TypeScriptのextendsを使うと、型での条件分岐が可能になるが、(T extends U ? P : K)
inferはその条件分岐で推論された型を指すときに用いることができる。
inferは引数によって動的に値が変化する変数のようなもの

**infer U**は列挙されているものを取り出すことができる
```ts
// TypeScriptドキュメントより抜粋

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;
```

上記は配列、関数、Promiseの中の型を取り出す型。
string[] なら string
(arg: string) => boolean なら boolean
Promise<string> なら string

---

## isとin演算子
**参考**<br>
(isとinを理解する)[https://qiita.com/ryo2132/items/ce9e13899e45dcfaff9b]<br>

### is
unknown、any、Union型などの型の絞り込みを行う。**(type predicate)**
ユーザー定義型ガード呼ばれる実装などで使われます。

#### isが生まれる背景
型ガードでいちいち`if(typeof == 型)`と書くのが煩わしいので型チェック専用の関数に切り出したいとする
```ts
const isString = (test: unknown): boolean => {
  return typeof test === "string";
};

const example = (foo: unknown) => {
  if (isString(foo)) {
    console.log(foo.length); // Error fooはまだunknownとして推論される
  }
};
```
しかし、この実装例だとうまく行かない。
型の情報は関数スコープで完結してしまう為、example関数のfooは`isString`関数を
噛ませた後でも`unknown`となってしまう。

#### このように使う

```ts
const isString = (test: unknown): test is string => {
  return typeof test === "string";
};

const example = (foo: unknown) => {
  if (isString(foo)) {
    console.log(foo.length); // fooはstringとして推論される
  }
};
```

isStringは真偽値を返し、trueを返すならば引数が指定した型であることを示す。
つまり、「戻り値がtrueの場合には引数の`test`はstring型である。」
とコンパイラーに教えることができる。


#### 注意点
isに関しての型チェックは実質ほとんど効いていない。
isStringを以下のようにしても、型チェックが通ってしまい、バグの元になるので注意。
```ts
function isString(x: unknown): x is string {
  return typeof x === "number";
}
```

### in

あるメンバーがクラスやオブジェクトに属しているかを調べる

```ts
type Engineer = {
  name: string;
  role: string;
}

type Designer = {
  name: string;
  tool: string;
}

type Job = Engineer | Designer

function checkJobs(job: Job) {
  // ここでjobはnameのみアクセス可
  if('role' in job) {
    // ここでjobはroleにもアクセス可
  }
  if('tool' in Job) {
    // ここでjobはtoolにもアクセス可
  }
}
```

---

## ユーザ定義型ガード
(ユーザ定義型ガード)[https://blog.uhy.ooo/entry/2021-04-09/typescript-is-any-as/]
を使用する場合、引数をunknownにして中でasを使う手法がより型安全とされている
上手にやればasを消すことも可能

### ユーザ定義型ガードとは
型ガード(Type guard, Type narrowing)に使用できる関数の一種。
ユーザ定義型ガードの戻り値の型はtype predicateを使う。
このような関数は真偽値を返り値として返し、trueを返すならば引数名が型であることを表す。

また、この関数の戻り値に指定している型を**型述語**と呼ぶが
isの説明でも書いてある通り、型述語は完全に書いた人の自己申告になるので
以下のような例はコンパイルエラーにならず、通ってしまう。

```
function isStringOrNumber(value: unknown): value is string | number {
  // 型述語と食い違う実装！
  return value === null;
}
```

<br>
ユーザ定義型ガードの使い道として典型的な例は、**APIの型定義**である。
このような外界から来たデータはほとんどの場合unknownとなるので
ユーザ側で型を明確にしてあげる必要がある。

### つくりかた

```ts
type ImportantData = {
  hello: string;
  hoge: number;
};

function isNotNullish(data: unknown): data is Record<string, unknown> {
  return data != null;
}

function isImportantData(data: unknown): data is ImportantData {
  if (!isNotNullish(data)) {
    return false;
  }
  return typeof data.hello === "string" && typeof data.hoge === "number";
}
```

このようにするとanyもasも使わない実装になる。

