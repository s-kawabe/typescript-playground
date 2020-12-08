// path: コアnode.jsモジュール
const path = require('path'); 

//-----------TIPS-------------
/* __dirname: nodeのグローバル変数 */
/* (書いた場所のファイル絶対パス) */
console.log(__dirname);
/* path.resolve: ディレクトリを結合 */
console.log(path.resolve(__dirname, 'HealthManagementApp', 'dist'))
//----------------------------

// Node.jsのexport(commonjs)
module.exports = {
  // webpackのエントリポイント
  entry: './HealthManagementApp/dist/main.js',
  // まとめたファイルの出力情報 
  output: {
    // まとめたファイル名
    // contenthash: bundle.jsがキャッシュにあった場合への対策
    // 中身が変わるとハッシュ値が書き変わり、別のファイルと認識される
    filename: 'bundle.js',
    // 上記をどこに置くか
    path: path.resolve(__dirname, 'HealthManagementApp', 'dist')
  },
  // sourceMap(他のファイルをブラウザにあげる)を使う
  devtool: 'inline-source-map'
}