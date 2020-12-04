"use strict";
// // classに関数を適用する----------------------------------
// // class全体にもclass内部の部分的にも適用できる
// // 場所によって引数が変わる
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
function LoggingFoo(text) {
    console.log(text + " Foo Factory outer");
    return function (constructor) {
        console.log(text + " Foo Factory inner");
    };
}
function LoggingBar(text) {
    console.log(text + " Bar Factory outer");
    return function (constructor) {
        console.log(text + " Bar Factory inner");
    };
}
var HogeUser = /** @class */ (function () {
    function HogeUser() {
    }
    HogeUser = __decorate([
        LoggingFoo('text'),
        LoggingBar('text3')
    ], HogeUser);
    return HogeUser;
}());
