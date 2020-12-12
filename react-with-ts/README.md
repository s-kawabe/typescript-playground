# ReactとTypeScriptで同時に開発する方法
- reactとreact-domをnpm install
- 型定義ファイルもインストール(@types/react, @types/react-dom)
- 拡張子.tsxファイルを生成
- reactとreact-domをimport
- tsconfig.jsonの設定変更
  ```
  "jsx": "preserve"
  ↓↓↓
  "jsx": "react"
  ```

# create-react-appでReact×TypeScript
```
npx create-react-app typescript-react --template typescript
```
上記でプロジェクト生成後、コンポーネント記述やタグ記述でエラーが出たが
tsconfig.json内のjsxを "jsx": "preserve"　とするとエラーが消えた

## propsに型をつける
他の記述は基本的に型推論でやってくれるが
propsは唯一従来の書き方ではうまくいかない。
```tsx
type HelloProps = {
  message: string;
}

const Hello = (props: HelloProps) => {
  return <h1>Hello {props.message}</h1>
}
```

## Hooks,Redux,Routerの使い方
基本的にはオブジェクト、変数をホバーして型を確認する

```tsx
// nullable
const [name, setName] = useState<string | null>('Jack');
```