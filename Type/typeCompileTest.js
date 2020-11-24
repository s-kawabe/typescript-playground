"use strict";
// 型推論
let hasValue = true;
let count = 10;
// 型注釈
let pi = 3.14;
let nega = -50;
let single = 'hoge';
let double = "hoge";
let back = `hoge`;
// オブジェクト
const person = {
    name: 'jack',
    age: 25
};
// 配列
const fruits = ['Apple', 'Banana', 'Lemon'];
const fruits2 = ['Apple', 3, 'Banana', 'Lemon', 5];
const fruits3 = ['Apple', 3, 'Banana', 'Lemon', 5];
// Tuple
const book = ['business', 1500, true];
book.push(33);
// Enum
// sizeが特定の４つのみの値をとるようにしたい
var CoffeSize;
(function (CoffeSize) {
    CoffeSize["SHORT"] = "SHORT";
    CoffeSize["TALL"] = "TALL";
    CoffeSize["GRANDE"] = "GRANDE";
    CoffeSize["VENTI"] = "VENTI";
})(CoffeSize || (CoffeSize = {}));
const coffe = {
    hot: true,
    size: CoffeSize.TALL
};
function doubleAndHandle(num, cb) {
    const doubleNum = cb(num * 2);
    // console.log(doubleNum);  
}
doubleAndHandle(21, doubleNum => {
    return doubleNum;
});
// never 
function error(message) {
    throw new Error(message);
}
console.log(error('this is an error'));
