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

## ! (Non-null assertion operator)
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
