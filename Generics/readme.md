# Generics
「型」の情報も引数として受け取る関数のつくりかた
```typescript
// <T>で受け取った型は、それ移行Tをどの場所でも使用できる <>内はいくつでも指定可能
function copy<T>(value: T): T {
  let user: T;
  return value;
}
console.log(copy<string>('hello'));

// objectの場合は呼び出し側で<>を省略できる
console.log(copy({ name: 'Quill' }));
```
---

## 型パラメータに制約をつける
```typescript
// T = string型のnameプロパティを持つオブジェクトに限定する
function copy<T extends { name: string }>(value: T): T {
  let user: T;
  return value;
}
```
---

##

