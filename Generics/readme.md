# Generics
「型」の情報も引数として受け取る関数のつくりかた
→関数、クラス、TypeAlias,interfaceに適用可能
```typescript
// <T>で受け取った型は、それ移行Tをどの場所でも使用できる <>内はいくつでも指定可能
function copy<T>(value: T): T {
  let user: T;
  return value;
}
console.log(copy<string>('hello'));

// objectの場合は呼び出し側で<>を省略できる
console.log(copy({ name: 'Quill' }));
```
---

## 型パラメータに制約をつける
```typescript
// T = string型のnameプロパティを持つオブジェクトに限定する
function copy<T extends { name: string }>(value: T): T {
  let user: T;
  return value;
}
```
---

## keyof演算子でオブジェクトのキーをunion型に
```typescript
// K はキー名のunion型になる
type K = keyof { name: 'taro', age: 32 };

// U はKのオブジェクトのプロパティ名一覧になる
function copy<T extends { name: string }, U extends keyof T>(value: T, key: U): T {
  value[key]  
  return value;
}

console.log(copy({ name: 'Quill', age: 32 },'name'))
```
---

## classに対してジェネリクスを使用する
Genericsを使うことで、class呼び出し時に型を確定させる
→class内で度々union型を使うよりも安全性が高い
```typescript
// classに対してジェネリクスを使用する
class LightDatabase<T extends string | number | boolean> {
  private data: T[] = [];

  add(item: T) {
    this.data.push(item);
  }
  remove(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }
  get() {
    return this.data;
  }
}

const lightDatabase = new LightDatabase<string>();
lightDatabase.add('panda');
lightDatabase.add('cat');
lightDatabase.add('dog');
console.log(lightDatabase.get());
```
---

## 内臓されているジェネリック型であるUtility型
Typescriptが提供する「型のライブラリ」
```typescript
interface Todo {
  title: string;
  text: string;
}

// ジェネリック：PartialとReadonly
type Todoable = Partial<Todo>
type ReadonlyTodo = Readonly<Todo>

// 型パラメータを使用する例
// ①Promise
const fetchData: Promise<string> = new Promise(resolve => {
  setTimeout(() => {
    resolve('hello');
  }, 3000);
})

fetchData.then(data => {
  // string型を認識している
  data.toUpperCase();
})

// ②配列
const animals: Array<string> = ['dog','cat','bird'];
```
---

## デフォルトの型パラメータを設定する
```typescript
// <>内でデフォルト引数のように扱う
interface ResponseData<T extends {message: string} = any> {
  type: T;
  data: string;
}

// 型パラメータを指定しなくてもOK
let responseData: ResponseData;
```
---

## 型のfor文 Mapped Types
型にロジックを適用する。
オブジェクトの中身をfor文で回して簡単に定義する

[オプション]
 - readonly [P in union型]: P 
 - [P in union型]?: P 
 - -readonly [P in union型]: P
※Utility型にはMappedTypeが使われている
```typescript
// Mapped Types
interface Vagetables {
  tomato: string;
  pumpkin: string;
}
// 1
type MappedTypes = {
  [P in 'tomato' | 'pumpkin']: P
}
// 2
type MappedTypes2 = {
  [P in keyof Vagetables]: P
}
// 3
type MappedTypes3<T> = {
  [P in keyof T]: P
}

let hoge: MappedTypes3<Vagetables> = {
  tomato: 'tomato',
  pumpkin: 'pumpkin'
};
```
---

## 型のif文 Conditional Type
```typescript
// A extends B ? X : Y
// AがBに入れられるか？ true:X false:Y を返す
type ConditionalType = 'tomato' extends string ? number : boolean;

// infer(inference:参照)
// infer R = ほぼany
// extends左の型で推論される。（以下の場合tomato型になる）
type ConditionalTypeInfer = { tomato: 'tomato' } extends
                            { tomato: infer R} ? R : boolean;

// DistributiveConditionalType 
// 以下の例だとfalseでbooleanとなるが
type DistributiveConditionalType = 'tomato' | 'pumpkin' extends
                                   'tomato' ? number : boolean;

// Genericsを使うとOK！ dct→ tomato | pumpkin
// これはUtility型でよく使われる(NonNullable, ReturnType)
type DistributiveConditionalType2<T> = T extends
                                   'tomato' ? number : boolean;
let dct: DistributiveConditionalType2<'tomato' | 'pumpkin'>
```
---
