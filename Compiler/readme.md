# Compilerについてのメモ

## watchモード
ファイルの変更を補足し、自動的にコンパイルする

```
> tsc index.ts --watch
```

## 一気に複数のtsをコンパイルする
ルートディレクトリにtsconfig.jsonを作成する
```
> tsc --init
```

tsconfig.json作成以降
```
// これだけで全てのファイルがコンパイルされる
> tsc
```

## tsconfig.jsonについて
### exclude
特定のファイルをコンパイル対象から除外する
```javascript
"exclude": [
  "compiler.ts",    // ルートディレクトリ直下のcompiler.ts 
  "**/compiler.ts", // ディレクトリ直下のどこでもcompiler.ts
  "*.spec.ts",
  "node_modules"   
  // node_modulesは他の定義をした際のみ明示的に書かなければいけない
]
```

### include
特定のファイルをコンパイル対象にする
(excludeと同時定義した場合は includeファイル - excludeファイル = コンパイルされるファイルとなる)
```javascript
"include": [
  "index.ts"
]
```

### files
ワイルドカードを用いずにファイル名を入力する
files > exclude > include の順で強い
```javascript
"files": [
  "tmp/compiler.ts"
]
```

### compilerOptions

#### target
どのJavascriptバージョンに合わせてコンパイルするかの設定

#### lib
型とその中のメソッドの情報一覧
"ES6"や"DOM"などの設定がある
省略した場合はtarget属性によって決まる

#### allowJs
javascriptをコンパイル対象にするかどうか

#### checkJs
javascriptもtypescriptのようにエラーチェックを行うかどうか

#### jsx
React.jsに使用する

#### declaration, declarationMap
自分がtsを使用してライブラリを作成した際、ユーザにはjsを使ってもらうことになる。
その際につか割れっる、コンパイル後のjavascriptに関する型定義ファイル
「~~.d.ts」が生成される

#### sourceMap
trueで、ブラウザがTypeScriptを理解できるようにする
→ブラウザのDecToolからtsファイルを見れる

#### outDir,rootDir
tsからjsにコンパイルした後の出力先を決めることができる

#### removeComments
コメントを消すかどうかの設定

#### noEmitOnError
エラーが出た場合にコンパイルをしない設定
新しくtsconfig.jsonに追加する必要がある
```javascript
"noEmitOnError": true,
```

#### Strict
- noImplicitAny (暗黙的なanyを許可するかどうか)
- strictNullCheck (厳しいnullチェックをする-string,null,undefinedの相互変換を拒否)
- strictBindCallApply (thisの初期値設定と引数の個数と型の厳密チェック)
- alwaysStrict (js変換時、自動でstrictにするかどうか)

#### SdditionalChecks
- noUnusedLocals (使用していない変数にエラーを出す)
  →グローバル変数は使用されていなくてもエラーにならない
- noUnusedParameters (使用されていない引数にエラーを出す)
- noImplicitReturn (returnを明示しないパスがあるとエラーを出す)

#### ExperimantalOptions
将来的にJavascriptに実装される可能性のある機能を使用することができる

