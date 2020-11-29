interface Nameble {
  readonly name: string;
  nickName?: string; // ? → 実装先で無くてもOK OptionalProperty
}

const nameble: Nameble = {
  name: 'Paul' // nickNameは未定義
}

// ■interface - オブジェクト構造のみを示すことが可能
// extendsによるinterface→interfaceの継承
interface Human extends Nameble{
  age: number;
  greeting(message: string): void;
  // or ↓
  // greeting: (message: string) => void;
}

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
class Developer implements Human {  
  // ★実装したinterfaceに含まれるフィールドに対して、publicかreadonly以外はエラー
  constructor(readonly name: string, public age: number, public experience: number) {}
  greeting(message?: string) {
    console.log(message);
  }
}

const user: Human = new Developer('Quill', 30, 10);

// オブジェクトによって初期化
const user2: Human = {
  name: 'Jack',
  age: 23,
  // NG!!
  // experience: 3,
  greeting(message: string) {
    console.log(message);
  }
}

user.greeting('foooo');
user2.greeting('barrrrrr');