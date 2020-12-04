"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Component(template, selector) {
    return function (constructor) {
        var mountedElement = document.querySelector(selector);
        var instance = new constructor('huga', 'hoga');
        if (mountedElement) {
            mountedElement.innerHTML = template;
            mountedElement.querySelector('h1').textContent = instance.name;
        }
    };
}
function LoggingAct(constructor) {
    console.log('Logging...');
    console.log(constructor);
}
var UserC = /** @class */ (function () {
    function UserC() {
        this.name = 'Quill';
        console.log('User was created.');
    }
    UserC = __decorate([
        LoggingAct,
        Component('<h1>{{ name }}</h1>', '#app')
    ], UserC);
    return UserC;
}());
var foo = new UserC();
var bar = new UserC();
var baz = new UserC();
