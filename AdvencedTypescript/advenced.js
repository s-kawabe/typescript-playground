"use strict";
// (interfaceでの表現)
// interface EngineerBlogger extends Engineer, Blogger { }
var tom = {
    name: 'tom',
    role: 'general',
    follower: 300
};
// TypeGuard---------------------------------------
// typeof - 何の型なのか調べる(標準の7つの型のうちどれか)
function toUpperCase(x) {
    if (typeof x === 'string') {
        return x.toUpperCase();
    }
    return '';
}
function describeProfile(nomad) {
    // この時点：nomadはnameのみにアクセスできる
    if ('role' in nomad) {
        // この時点：nomadはroleにもアクセスできる
    }
    if ('follower' in nomad) {
        // この時点：nomadはfollowerにもアクセスできる
    }
}
// instanceof - 特定のインスタンスが特定のクラスから生成されたものか調べる
// 型アサーション----------------------------------
// <>を用いる→キャストするイメージ 
var input = document.getElementById('input');
input.value = 'Hello Initial Content';
// asを用いる
var input2 = document.getElementById('input');
input.value = 'Hello Initial Content';
var designer = {
    name: 'mikel',
    nickName: 'mike'
    // NG
    // age: 12,
};
function checkType(type) {
    if (typeof type === 'string') {
        return type.toUpperCase();
    }
    else {
        return type;
    }
}
var refStr = checkType('hello');
var refNum = checkType(30);
