const path = require('path'); 

module.exports = {
  mode: 'development',
  entry: './ReactWithTS/react.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'ReactWithTS', 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  // importのファイル拡張子がついてなかった場合の名前解決
  resolve: {
    modules: [path.resolve(__dirname, 'ReactWithTS', 'dist'), "node_modules"],
    extensions: ['.tsx','.ts','.ts']
  },
}