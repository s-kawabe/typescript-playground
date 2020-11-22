// 型推論
let hasValue = true;
let count = 10;

// 型注釈
let pi: number = 3.14;
let nega: number = -50;
let single: string = 'hoge';
let double: string = "hoge";
let back: string = `hoge`;

// オブジェクト
const person: {
  name: string;
  age: number;
} = {
  name: 'jack',
  age: 25
}

const fruits: string[] = ['Apple','Banana','Lemon']
const fruits2: any[] = ['Apple',3,'Banana','Lemon',5]
const fruits3 = ['Apple',3,'Banana','Lemon',5]