/*
*  default parameter
*/
type Context = {
  appId?: string
  userId?: string
}

function log(message: string, context: Context = {}) {
  let time = new Date().toISOString()
  console.log(time, message, context.userId)
}

/*
*  rest parameter - 可変長引数関数
*/
//  従来の方法(arguments)
//  nはanyになってしまう！
function sumVariadic(): number {
  return Array.from(arguments).reduce((total, n) => total + n, 0)
}

// レストパラメータを使って型安全にする
function sumVariadicSafe(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}

let ret1 = sumVariadic(1,2,3)
let ret2 = sumVariadicSafe(1,2,3)

/*
*  call, apply, bind
*/
function add(a: number, b: number): number {
  return a + b
}

add(10,20)
// 第１引数の指定によりthisに何をバインドするか決めている
add.apply(null, [10,20])
add.call(null, 10,20)
add.bind(null, 10,20)()

/*
*  ジェネレーター関数
*/
// ジェネレータ関数 は、function* gfn(from, to){ while(from <= to) yield from++; }、のようなアスタリスク付き関数
// ジェネレータ は、gfn(1, 20) のように ジェネレータ関数 から得ることのできるオブジェクト

/*
*  オーバーロードされた関数の型
*/

// 呼び出しシグネチャの省略記法
type Log = (message: string, userId?: string) => void

// 完全な呼び出しシグネチャ
type Reserve = {
  (from: Date, to: Date, destination: string): Reservation // 1
  (from: Date, destination: string): Reservation // 2
}

let reserve: Reserve = (
  from: Date,
  toOrDestination: Date | string,
  destination?: string
) => {
  if(toOrDestination instanceof Date && destination !== undefined) {
    // 1を想定して呼ばれた時の処理
  } else if(typeof toOrDestination === 'string') {
    // 2を想定して呼ばれた時の処理
  }
}

/*
*  制限付きポリモーフィズム (ジェネリック型のフィルタリング) T extends U
*/
type TreeNode = {
  value: string
}
type LeafNode = TreeNode & {
  isLeaf: true
}
type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode]
}

let a2: TreeNode = {value: 'a'}
let b2: LeafNode = {value: 'b', isLeaf: true}
let c2: InnerNode = {value: 'c', children: [b2]}


const mapNode = <T extends TreeNode>(
  node: T,
  f: (value: string) => string
  ): T => {
    return {
      ...node,
      value: f(node.value)
    }
  }k
  
  let a21 = mapNode(a2, _ => _.toUpperCase())
  let b21 = mapNode(b2, _ => _.toUpperCase())
  let c21 = mapNode(c2, _ => _.toUpperCase())

let data: { [key: number]: string } = {
  1: 'aaaaaaa',
  2: 'bbbbbbb'
} 

