## environment

### install

```
npm init --yes
```

```
yarn add -D typescript @types/node
```

```
npx tsc --init
```

### package.json書き換え
```
type フィールドを "module" に設定すると、パッケージ内のすべての .js ファイルを ES モジュールとして指定することができます。
type "フィールドが省略された場合、または "commonjs "に設定された場合、すべての.jsファイルはCommonJSとして扱われます。
```

### tsconfig書き換え

- target: "es2022"
- module: "esnext"
- moduleResolution: "node"
- outDir: "./dist"

```
"include": ["./src/**/*.ts"]
```