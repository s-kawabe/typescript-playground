# Decorator
「@」を使う記法,クラスを受け取ってデコレーションする関数<br>
フレームワーク使用時などに遭遇する<br>
※使用するにはtsconfig.jsonのexperimentalDecoratorをtrueに

---
## 基本的な使い方(Classに関数を適用する)
decoratorはclassのインスタンス生成時ではなく<br>
<strong>classの定義時</strong>に実行される！

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
---

## デコレータファクトリを使用し、引数を渡す
デコレータへの引数を渡す方法<br>
デコレータ関数を返す関数：**デコレータファクトリ**
```typescript
// そのまま引数を追加するとエラーになる...
function Logging(constructor: Function, message: string) {...}

// デコレータファクトリをラップする関数を用意する
// そこに対して追加したい引数を指定
function Logging2(message: string) {
  return function(constructor: Function) {
    console.log(message);
    console.log(constructor);
  }
}

@Logging2('Helloooooo!!')
class User2 {
  name = 'Quill';
  constructor() {
    console.log('User was created.')
  }
}
```
---

## 複数のデコレータを同時に使う
実行順序はデコレータファクトリ外は上から下<br>
デコレータファクトリ内の関数は下から上
```typescript
// 2つのデコレータの実行順序
function LoggingFoo(text: string) {
  console.log(`${text} Foo Factory outer`); // 1
  return function(constructor: Function) {
    console.log(`${text} Foo Factory inner`); // 4
  }
}

function LoggingBar(text: string) {
  console.log(`${text} Bar Factory outer`); // 2
  return function(constructor: Function) {
    console.log(`${text} Bar Factory inner`); // 3
  }
}

@LoggingFoo('text')
@LoggingBar('text3')
class HogeUser {

}
```
---

## デコレータの戻り値にクラスを指定して、新しいクラスを作り出す
```typescript

```
---

##
```typescript
```
---

##
```typescript
```
---

##
```typescript
```
---