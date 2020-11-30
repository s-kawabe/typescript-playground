type Engineer = {
  name: string;
  role: string;
}

type Blogger = {
  name: string;
  follower: number;
}

// インターセクション型---------------------------------------
type EngineerBlogger = Engineer & Blogger;
// (interfaceでの表現)
// interface EngineerBlogger extends Engineer, Blogger { }

const tom: EngineerBlogger = {
  name: 'tom',
  role: 'general',
  follower: 300
}


// TypeGuard---------------------------------------
// typeof - 何の型なのか調べる(標準の7つの型のうちどれか)
function toUpperCase(x: string | number) {
  if(typeof x === 'string') {
    return x.toUpperCase();
  }
  return '';
}

// in - 特定のメンバーがあるクラスに属しているのか調べる
type NomadWorker = Engineer | Blogger;
function describeProfile(nomad: NomadWorker) {
  // この時点：nomadはnameのみにアクセスできる
  if('role' in nomad) {
    // この時点：nomadはroleにもアクセスできる
  }
  if('follower' in nomad) {
    // この時点：nomadはfollowerにもアクセスできる
  }
}

// instanceof - 特定のインスタンスが特定のクラスから生成されたものか調べる

// 型アサーション----------------------------------
// <>を用いる→キャストするイメージ 
const input = <HTMLInputElement>document.getElementById('input');
input.value = 'Hello Initial Content'

// asを用いる
const input2 = document.getElementById('input') as HTMLInputElement;
input.value = 'Hello Initial Content'

// Index signature------------------------------
interface Designer {
  name: string;
  // interfaceに以下を定義する
  [index: string]: string;
}
const designer: Designer = {
  name: 'mikel',
  nickName: 'mike'
  // NG
  // age: 12,
}

// 関数のオーバーロード----------------------------
// 使用する場合はオーバーロード先の関数の取りうる引数全てを列挙しなければいけない
// これの順番は上から順に評価される。
function checkType(type: string): string
function checkType(type: number): number
function checkType(type: string | number) {
  if(typeof type === 'string') {
    return type.toUpperCase();
  } else {
    return type;
  }
}

const refStr = checkType('hello');
const refNum = checkType(30);

const test = checkType

// LookUp--------------------------------------
type hoge = DownloadedData['id'];
const hage: hoge = 22;


// REST Parameter (Javascriptからある)--------
// Tupleを用いる 最後にOptional parameterも使用できる
function advancedFnc(...args: [number, string, boolean, ...number[]]) {
  console.log(args[0]);
}

advancedFnc(0,'hoge', true,3,5,6,7)

// constアサーション
const milk = 'milk' as const;
let drink = milk;
const array = [10,20] as const;

const peter = {
  name: 'Peter',
  age: 38
} as const
// 以下と同義
// const peter: {
//   readonly name: 'Peter';
//   readonly age: 38;
// } = {
//   name: 'Peter',
//   age: 38
// };