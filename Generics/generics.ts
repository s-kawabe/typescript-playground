// <T>で受け取った型は、それ移行Tをどの場所でも使用できる
function copy<T>(value: T): T {
  let user: T;
  return value;
}
console.log(copy<string>('hello'))