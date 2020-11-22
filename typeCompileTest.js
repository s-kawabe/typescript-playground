// 型推論
var hasValue = true;
var count = 10;
// 型注釈
var pi = 3.14;
var nega = -50;
var single = 'hoge';
var double = "hoge";
var back = "hoge";
// オブジェクト
var person = {
    name: 'jack',
    age: 25
};
// 配列
var fruits = ['Apple', 'Banana', 'Lemon'];
var fruits2 = ['Apple', 3, 'Banana', 'Lemon', 5];
var fruits3 = ['Apple', 3, 'Banana', 'Lemon', 5];
// Tuple
var book = ['business', 1500, true];
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
var coffe = {
    hot: true,
    size: CoffeSize.TALL
};
function doubleAndHandle(num, cb) {
    var doubleNum = cb(num * 2);
    console.log(doubleNum);
}
doubleAndHandle(21, function (doubleNum) {
    return doubleNum;
});
