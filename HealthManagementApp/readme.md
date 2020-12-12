# Webpackについていろいろ

```
★☆★ npm install の --saveについて
npm install時にpackage.jsonのdependenciesに追加してくれる。
--save-devはdevDependenciesにいく。
(npm 5.0移行から記述しなくても標準でやってくれるようになった)
```

## Webpackの利点
- モダンでないブラウザでもモジュールを使用できる
- ファイルが分散していた場合もHTTP通信を一括で行うことができる
- コードを最適化してminifyする
- プラグインを追加できる
- 様々な種類のファイルを扱える
- HMR（便利な開発環境）つきのローカルサーバを使用できる

## つかいかた
1. npm  init -y<br>
package.jsonを作成

2. npm install --save-dev webpack webpack-cli<br>
インストール<br>
package.jsonに以下記述するといいかも
```javascript
"scripts" {
  "build": "webpack"
}
```

3. 「webpack.config.js」を作成<br>
```javascript
// path: コアnode.jsモジュール
const path = require('path'); 

//-----------TIPS-------------
/* __dirname: nodeのグローバル変数 */
/* (書いた場所のファイル絶対パス) */
console.log(__dirname);
/* path.resolve: ディレクトリを結合 */
console.log(path.resolve(__dirname, 'dist'))
//----------------------------

// Node.jsのexport(commonjs)
module.exports = {
  // webpackのエントリポイント
  entry: './dist/main.js',
  // まとめたファイルの出力情報 
  output: {
    // まとめたファイル名
    // contenthash: bundle.jsがキャッシュにあった場合への対策
    // 中身が変わるとハッシュ値が書き変わり、別のファイルと認識される
    filename: '[contenthash]bundle.js',
    // 上記をどこに置くか
    path: path.resolve(__dirname, 'dist')
  }
}
```

4. npm run build<br>
ファイルが生成される！！！

## sourceMapをつかう
sourceMap...Typescriptファイルもブラウザにアップロードする
webpack.config.jsに以下を追記
```javascript
// module.esportsに追加
devtool: 'inline-source-map'
```

## ts-loader
TSファイルをWebpackが解析し、直接バンドルを生成する
ts-loaderはtsc同様にtypescriptの型チェックなども担ってくれる
※ 一部tsconfig.jsonの設定を引き継ぐ
```
// グローバルインストールしていたtypescriptも一緒にインストール
npm install --save-dev ts-loader typescript 
```
module.exports内に記載
```javascript
module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  }
```

tsファイルのimport拡張子はつけない
``` typescript
import { Scoreable } from "./interfaces";
import { Foods } from "./foods";
```

**importファイルの拡張子が記述されていない場合に.tsを付与する設定**<br>
module.exports内に記載
```javascript
// importのファイル拡張子がついてなかった場合の名前解決
resolve: {
  extensions: ['.ts','.ts']
}
```

## webpack-dev-server
tscのwatchモードのような機能<br>
ファイルプロトコルでなくHTTP通信となる<br>
HMRの機能あり(ソースを保存→コンパイル→自動でブラウザに反映！)

webpack-dev-server実行時、ts→jsへのコンパイルはあくまで
内部的な処理になるため、ファイルを可視化することはできない
「ローカルサーバ/bundle.js(仮)」というエンドポイントにアクセスした
場合のみ、そのコンパイル結果ファイルを返すという形になる
(npm run webpack)

2020.10.10よりwebpack ver5となり
```
webpack-dev-server → webpack serve
```
 になった。しかしwebpack-dev-serverもインストールしておく必要がある

 設定ファイルを環境ごとに変えて --config オプションで切り替えることができる

 ## webpackの設定ファイルの対象を状況に応じて変える
 --config wenpack.○○.json とすると対象の設定ファイルを指定できる。
 ```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js",
    "start": "webpack-dev-server --config webpack.dev.js"
  },
 ```