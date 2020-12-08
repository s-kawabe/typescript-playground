# Webpackについていろいろ

## Webpackの利点
- モダンでないブラウザでもモジュールを使用できる
- ファイルが分散していた場合もHTTP通信を一括で行うことができる
- コードを最適化してminifyする
- プラグインを追加できる
- 様々な種類のファイルを扱える
- HMR（便利な開発環境）つきのローカルサーバを使用できる

## つかいかた
1. npm  init -y<br>
tsconfig.jsonを作成

2. npm install --save-dev webpack webpack-cli<br>
インストール<br>
tsconfig.jsonに以下記述するといいかも
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

## 