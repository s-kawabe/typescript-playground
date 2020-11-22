# Typescript
(参考)[https://www.youtube.com/watch?v=F9vzRz6jyRk&t=28s]

## boolean
tscがどうやってbooleanを認識しているか？
→変数をマウスホバーすることで型情報が確認可能
```typescript
let hasValue: boolean = true;
```

## number
numberで整数、負数、不動小数すべてを表現
```typescript
let count: number = 10;
let pi: number = 3.14;
let nega: number = -50;
```

## string
```typescript
let single: string = 'hoge';
let double: string = "hoge";
let back: string = `hoge`;
```

## 型注釈と型推論
#### 型注釈
以下の部分
let single<strong>: string</strong> = 'hoge'

#### 型推論
型注釈を書かなかった場合、tsが推測で型を認識する。
let hasValue = true;
→ コレは多分booleanだ！

##### 結論
- 基本的には型推論、それ以外の初期化しない場合などに型注釈を用いる
- anyについては型注釈を用いる

## オブジェクトに型をつける
型注釈
```typescript
const person: {
  name: string;
  age: number;
} = {
  name: 'jack',
  age: 25
}
```
or 型推論で直接オブジェクトリテラルを記述するのがよい。

## 配列
型注釈あり（特定の型）
```typescript 
const fruits: string[] = ['Apple','Banana','Lemon']
```
型注釈あり（any型）
```typescript 
const fruits: any[] = ['Apple',3,'Banana','Lemon',5]
```
型注釈なし
```typescript
// Union型になる 
const fruits = ['Apple',3,'Banana','Lemon',5]
```



