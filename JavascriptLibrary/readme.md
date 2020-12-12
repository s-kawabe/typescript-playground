# TypeScriptでJavaScriptライブラリを使用する

- 型定義ファイル(.d.ts)について
- 既存の型定義ファイルを使う
- .d.tsファイルでnpmからインストールしたライブラリを使用
- .d.tsをつくってCDNからインストールしたライブラリを使用
- namespaceの使い方
- axiosの型定義ファイルを理解しdeclareを汁
- 同じ名前の値、型、namespaceを一緒に使う★
- だれかの型定義のファイルの拡張方法


## 1 型定義ファイル(.d.ts)について
tsconfig.js <br>
"moduleResolution": "node"<br>
モジュールをimportするためinode_modulesを見にいく<br>
"module": "es6"にする<br>

★★nodeを使用する場合他のサードパーティライブラリを使うにはCDNを使う★★<br>

サードパーティパッケージは○○.jsを読み込んでいる<br>
しかしそのモジュールパッケージ内にある「.d.ts」<br>
が型の情報を保持してくれている→★declaration!!<br>

tsconfig.js<br>
"decralation": "true"<br>
→wenpackでbuildした時jsファイルとそれぞれの.d.ts(declaration)が生成される。

## 2 既存の型定義ファイルを使う
npm installしたライブラリはjsファイルとなっているため、型定義ファイルがない(declaration)

- 解決策１<br>
  node_modules/@types に誰かがつくった型定義ファイルを配置する
  @types/[ライブラリ名] をnpm installする
  
  **DefnitelyTyped**
  TypeScript公式の、ライブラリの型定義ファイルの集合<br>
  ユーザの有志によってコミットされる。
  
- 解決策２<br>
  自分でつくる
  ```
  // 例
  declare module '[モジュール名]` {
    export function shuffle<T>(arr: T[]): T[]
  }
  ```

## 3 declareの意味を知る
declare(宣言)の修飾子とは。
定数を作るのではなくあくまで「どこかで使用される」ことを示す
```
// アンビエント宣言
declare const Axios: AxiosStatic;
```

## 4 ///ディレクティブ
トリプルスラッシュディレクティブ
型情報の依存関係を示す。jsコンパイル時になくなる
```
///<reference path="./common/common.d.ts">
```

## 5 TypeScriptにおける型定義ファイルのexport
TypeScriptにおける、module.exports = ○○ の書き方(Node用、commonJS)<br>
( ES6のexportは export ○○, やexport default ○○ )
```
export = _;
```

変数をexportしている。
スクリプト直接読み込み(import使わない)の際のためのexport
```
export as namespace _;
```
## 6 namespaceで同じ名前のフィールドを定義する
同じ名前の以下は共存可能。
- 値
- 型
- namespace
```typescript
// Not Error!
let name: string;
// function name() {}
// enum name {} 
// class name {}
interface name {}
namespace name {}
```
namespaceは値にもなる。<br>
中に値を保持するnamespace ⇄ 値 はエラー！

interface ⇄ interfaceは同じ名前を定義できる
→最終的に同じ名前だったらマージされる
```typescript
interface name {
  name: string;
}

interface name {
  age: number;
}

// nameとage両方を持つ
class hoge implements name { }
```