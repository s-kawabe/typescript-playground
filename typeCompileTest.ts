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

// 配列
const fruits: string[] = ['Apple','Banana','Lemon']
const fruits2: any[] = ['Apple',3,'Banana','Lemon',5]
const fruits3 = ['Apple',3,'Banana','Lemon',5]

// Tuple
const book: [string, number, boolean] = ['business', 1500, true]
book.push(33);

// Enum
// sizeが特定の４つのみの値をとるようにしたい
enum CoffeSize {
  SHORT = 'SHORT',
  TALL = 'TALL',
  GRANDE = 'GRANDE',
  VENTI = 'VENTI'
}

const coffe = {
  hot: true,
  size: CoffeSize.TALL
}

function doubleAndHandle(num: number, cb: (num: number) => number) {
  const doubleNum = cb(num * 2);
  console.log(doubleNum);  
}
doubleAndHandle(21, doubleNum => {
  return doubleNum;
});