# Decorator
「@」を使う記法,クラスを受け取ってデコレーションする関数<br>
フレームワーク使用時などに遭遇する<br>
※使用するにはtsconfig.jsonのexperimentalDecoratorをtrueに

---
## 基本的な使い方(Classに関数を適用する) クラスデコレータ
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
デコレータの対象となるfunctionのでコレータファクトリ内に再びreturnを記述することで
様々なクラスからの参照に対応できる
```typescript
function Component(template: string, selector: string) {
  return function<T extends { new(...args: any[]): { name: string } }>(constructor: T) {
    // クラスの定義時ではなくインスタンスの生成時に実行されるデコレータ
    return class extends constructor{
      constructor(...args: any[]) {
        super(...args);
        console.log('Component');
        const mountedElement = document.querySelector(selector);
        const instance = new constructor('huga', 'hoga');
        if(mountedElement) {
        mountedElement.innerHTML = template;
        mountedElement.querySelector('h1')!.textContent = instance.name;
        }
      }
    }
  }
}
```
---

## プロパティデコレータ
クラス内のプロパティに対して適用する<br>
```typescript
// プロパティデコレータ
// prop=>(taeget:呼び出し元のクラスのプロトタイプ propertyKey:対象のプロパティの型)
// クラスデコレータより先に実行される！
function PropertyLogging(target: any, propertyKey: string) {
  console.log('propertyLogging!');
  console.log(target);
  console.log(propertyKey);
}

// プロパティがstaticの場合のtarget→クラス(コンストラクタ関数)
// staticでない場合のtarget→プロトタイプ
```
---

## メソッドデコレータ
```typescript
// メソッドデコレータ prop=>(taeget:呼び出し元のクラスのプロトタイプ
//                        propertyKey:対象のプロパティの型
//                        descriptor: ディスクリプタ(オブジェクト))
function MethodLogging(target: any, propertyKey: string, descriptor: PropertyDecorator) {
  console.log('MethodLogging!');
  console.log(target);
  console.log(propertyKey);
}

// プロパティディスクリプタ
// writable: 書き込み可能か
// configurable: ループ時に列挙されるか
// enumerable: 他のディスクリプタの状態を変更可能か
```
---

## 実践的メソッドデコレータ
メソッドデコレータを定義したメソッドに対して、returnをして
呼び出し元のメソッドを違うものに変更することができる
```typescript
// デコレータの指定方法によってディスクリプタを書き換える
function enumarable(isEnumerable: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return {
      enumerable: isEnumerable
    }
  }
}

class User {
  @enumarable(false)
  @MethodLogging
  greeting() {
    console.log('Hello!');
  }
}
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