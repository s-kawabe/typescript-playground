// // classに関数を適用する----------------------------------
// // class全体にもclass内部の部分的にも適用できる
// // 場所によって引数が変わる

// // Function → 内臓されているコンストラクタ関数
// function Logging(constructor: Function) {
//   console.log('Logging...');
//   console.log(constructor);
// }

// // ★decoratorはclassのインスタンス生成時ではなく
// //  classの定義時に実行される！

// // => Logging...
// // => [Function: User]
// @Logging
// class User {
//   name = 'Quill';
//   constructor() {
//     console.log('User was created.')
//   }
// }

// decorator factory------------------------------
// デコレータファクトリをラップする関数を用意する
// そこに対して追加したい引数を指定
// function Logging2(message: string) {
//   return function(constructor: Function) {
//     console.log(message);
//     console.log(constructor);
//   }
// }

// @Logging2('Helloooooo!!')
// class User2 {
//   name = 'Quill';
//   constructor() {
//     console.log('User was created.')
//   }
// }

// 2つのデコレータを使用する
function LoggingFoo(text: string) {
  console.log(`${text} Foo Factory outer`);
  return function(constructor: Function) {
    console.log(`${text} Foo Factory inner`);
  }
}

function LoggingBar(text: string) {
  console.log(`${text} Bar Factory outer`);
  return function(constructor: Function) {
    console.log(`${text} Bar Factory inner`);
  }
}

@LoggingFoo('text')
@LoggingBar('text3')
class HogeUser {

}
