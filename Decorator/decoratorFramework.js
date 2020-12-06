"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Component(template, selector) {
    return function (constructor) {
        // クラスの定義時ではなくインスタンスの生成時に実行されるデコレータ
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, args) || this;
                console.log('Component');
                var mountedElement = document.querySelector(selector);
                var instance = new constructor('huga', 'hoga');
                if (mountedElement) {
                    mountedElement.innerHTML = template;
                    mountedElement.querySelector('h1').textContent = instance.name;
                }
                return _this;
            }
            return class_1;
        }(constructor));
    };
}
function LoggingAct(constructor) {
    console.log('Logging...');
    console.log(constructor);
}
// (注意)
// class → コンストラクタ関数
// 関数 → オブジェクト
// プロパティデコレータ prop=>(taeget:呼び出し元のクラスのプロトタイプ propertyKey:対象のプロパティの型)
// クラスデコレータより先に実行される！
function PropertyLogging(target, propertyKey) {
    console.log('propertyLogging!');
    console.log(target);
    console.log(propertyKey);
}
// メソッドデコレータ
function MethodLogging(target, propertyKey) {
    console.log('MethodLogging!');
    console.log(target);
    console.log(propertyKey);
}
var UserC = /** @class */ (function () {
    function UserC(age) {
        this.age = age;
        // プロパティデコレータ
        this.name = 'Quill';
        console.log('User was created.');
    }
    __decorate([
        PropertyLogging
    ], UserC.prototype, "name", void 0);
    UserC = __decorate([
        LoggingAct,
        Component('<h1>{{ name }}</h1>', '#app')
    ], UserC);
    return UserC;
}());
// User.prototype === user1.__proto__ => true
var foo = new UserC(30);
var bar = new UserC(40);
var baz = new UserC(60);
