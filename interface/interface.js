"use strict";
// ■type - どの型でも変数に格納できる
// type Human = {
//   name: string;
//   age: number;
// }
// ■オブジェクトにinterfaceを適用する(型注釈付き)
// const developper: Human = {
//   name: 'Quill',
//   age: 38,
//   greeting(message: string): void {
//     console.log(`Hello ${message}`);
//   }
// }
// ■classにinterfaceを適用する
var Developer = /** @class */ (function () {
    // ★実装したinterfaceに含まれるフィールドに対して、publicかreadonly以外はエラー
    function Developer(name, age, experience) {
        this.name = name;
        this.age = age;
        this.experience = experience;
    }
    Developer.prototype.greeting = function (message) {
        console.log("Hello " + message);
    };
    return Developer;
}());
var user = new Developer('Quill', 30, 10);
// オブジェクトによって初期化
var user2 = {
    name: 'Jack',
    age: 23,
    // NG!!
    // experience: 3,
    greeting: function (message) {
        console.log(message);
    }
};
user.greeting('foooo');
user2.greeting('barrrrrr');
