# React×TypeScriptでよく使う演算子まとめ
TypeScriptには、既存のJavaScriptからある物も含めて、
たくさん演算子があると思います。
初学者故に絶賛混乱中なので記事にまとめてみました。
従来のif文における演算子や、
単純な計算に用いる演算子など
簡単すぎるものは今回省略させていただいています。

全部丸暗記する必要はないかと思いますが、
これを見て「なんとなくこんなのあったな〜」程度で引き出しに入れておくと
良いのかなと思います。
未熟者なので至らない表現があるところは何卒ご了承願います。

**見出しに`(TS)`をつけているものはTypeScriptオンリーなものとなります。**

## △△ ? ** : ●●
**三項演算子**です。
`△△`部分の式がtrue → `**`が評価される
`△△`部分の式がfalse → `●●`が評価される

TypeScriptのConditionalTypeと呼ばれる型定義でも
この参考演算子が使われます。

```ts
const animal = 'dog';
animal == 'cat' ? console.log('meow') : console.log('bow wow')
// => meow

const cry = animal == 'cat' ? 'meow' : 'bow wow' 
// cry = 'bow wow' 
```

Reactではコンポーネントの表示時に以下のように
三項演算子を用いることがあります。
```tsx
{user ? (
    <>
      <h1>Hello! {user.name}</h1>
    </>
  ) : (
    <>
      <h1>Hello! Guest</h1>
    </>
  )}

// userの存在有無でHTMLの表示を変える
```

## ||
**OR演算子**です。
if文でよく使われる書き方は今回説明を省略します。
Reactにおける短絡評価での`||`は
**最初にtrueになったもの**を返します。
<br>
> **短絡評価(ショートサーキット評価)とは**
> 右辺の評価を左辺の評価に委ねるような記法のこと。
> Reactにおける関数型プログラミングでは文によって手続きを
> 書き連ねるスタイルよりもこちらの書き方が好まれている。

<br>

```ts
const foo = null
const bar = 'bar'
const baz = 0

console.log(foo || bar || baz)
// => bar
```

## &&
**AND演算子**です。
こちらも同様に短絡評価に用いた際の動きを説明します。
`&&`は**最初にfalseになったたもの**を返します。

<br>

```ts
const foo = null
const bar = 'bar'
const baz = 0

console.log(foo && baz && bar)
// => null
```

## ??
**NULL結合演算子(NullishCoalescing)**です。
急に名前が難しくなりましたが、先の`||`や`&&`と似た様な評価をします。
(こちらはJavaScriptES2020~,TypeScript3.7~搭載の新しめな機能です。)
`??`は**最初にnullかundifinedにならなかったもの**を返します。
つまり`&&`での評価対象(falsy)からnullとundifinedを外した場合の動きになります。

<br>

```ts
const foo = null
const bar = 'bar'
const baz = 0

console.log(foo ?? baz ?? bar)
// => 0
```

`??`に関してはここぞという時に大変便利です。
以下のLINE社の[フロントエンドへの取組みの動画](https://youtu.be/mHZ_wWTOkHY?t=884)の一部
をみていただくと実際のコードで`??`を使うメリットがお分かりいただけると思います。

## !!
これは...名前はついていない気がします。
先ほどと同じ並びで混乱するかもしれませんが
こちらは値を**真偽値に変換する**際の演算子です。
恐らく以下のようなif文は誰でも見たことがあると思います。
```tsx
const ret = isSuccess(); // 何らかの処理
if(!ret) {
  // 何らかの処理に失敗している場合のエラー処理
}
```
このretに更にもう一つ`!`をつけるとtrueになると思いますが
つまり`!!`はその値を真偽値で２回反転させるため。**真偽値に変換する**
という動作となります。
```tsx
const foo = '';
const bar = 'bar'
console.log(!!foo, !!bar)
// => false true
```

## | (TS)
TypeScriptにおける**合併型(Union型)**です。
一言でいうと**複数の型の集合かつどれかを満たせばいい型**です。
詳しくは他の方の[素晴らしい記事](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#comments)などで学んでいただければと思いますが
以下の様な使い方をします。

```tsx
type Animal = 'dog' | 'cat' | 'pig' | 'fox'

const animal: Animal = 'dog';
// error!!
const animal2: Animal = 'lion'
```

## & (TS)
TypeScriptにおける**交差型(InterSection型)**です。
こちらも一言で言うと**複数の型の集合かつ全てを満たさなければいけない型**です。
以下の様な使い方をします。
Union型との違いを確認していただければ分かりやすいかと思います。

```tsx
type Profile1 = {
  name: string;
  height: number;
  weight: number;
}

type Profile2 = {
  name: string;
  age: number;
  job: string;
}

type FullProfile1 = Profile1 | Profile2
type FullProfile2 = Profile1 & Profile2

const fullProfile1: FullProfile = {
  name: 'Jhon',
  height: 170,
  weight: 60
}

// error!! (lacking 'age' and 'job')
const fullProfile2: FullProfile2 = {
  name: 'Jhon',
  height: 170,
  weight: 60
}
```
FullProfile1はUnion型のため、Profile1かProfile2のプロパティを
どちらか片方満たせば良いのに対して
FullProfile2はInterSectionなのでどちらも満たさないとerrorになってしまいます。

## ? 
TypeScriptにおける**OptionalChaining**です。
(これもJavaScriptES2020~,TypeScript3.7~搭載)
プロパティが存在すればそのプロパティを返す、
なければエラーundifinedを返す といった動きを実現します。

```tsx
interface DownloadedData {
  id: number;
  user?: {
    name?: {
      first: string;
      last: string;
    }
  };
}
const downloadedData: DownloadedData = {
  id: 1
}
const downloadedData2: DownloadedData = {
  id: 2
  user: {
    name: {
      first: Steev,
      last: Jobs
    } 
  }
}

console.log(downloadedData.user?.name); // => undifined
console.log(downloadedData2.user?.name); // => { first: Steev, last: Jobs } 
```
DownloadedDataの中の?がついているものは無くてもOKという
プロパティです。この型を適用した物からuser以降のプロパティを取り出したいときは
無い場合にも対応したいのでこの演算子を活用します。


## ! (TS)
TypeScriptにおける**Non-null assertion operator**です。
nullを返す可能性のあるものの末尾に付加することでnullを拒否することができます。

```ts
// document.getElementByIdは指定したidが存在しない場合もあるため
// デフォルトでの戻り値は HTMLElement | null 型となっているが
// この書き方をすることでinputにはHTMLElementが入る
const input = document.getElementById('input')!
```

ですが、この演算子はTypeScriptにおけるnull安全性を壊す実装なので
可能であれば使わないほうがいいものと認識しています。
気になる型はここらへんのワードで調べてみてください。

## keyof (TS)
keyofは**オブジェクトのプロパティキーの一覧を抽出**します。
TypeScriptのジェネリクスにおいてよく使われる印象があります。

```ts
type K = keyof { name: 'Jack', age: 32 }
// K => 'name' | 'age'
```

## typeof
ここからの3つはTypeScriptでは**型ガード**の場面で活用されます。
型ガードは値やオブジェクトの型を調べる手法の一つです。
typeofは**値を指定してその型を調べます。**

```ts
function toUpperCase(x: string | number) {
  // typeof xでxの型が抽出される
  if(typeof x === 'string') {
    // この位置ではxはstring型が確定しているのでtoUpperCaseが使える
    return x.toUpperCase();
  }
  return '';
}
```

また、このようにオブジェクトの型を抽出する使い方もできます。
```ts
const person = { name: 'Jack', age: 32 }

type Tperson = typeof person
```

## instanceof 
あるインスタンスあどのクラスから生成されたものかを調べます。
クラスを用いるパターンに使えるかと思います。

```ts
class User1 {
  foo = 123;
  common = '123';
}

class User2 {
  bar = 123;
  common = '123';
}

function check(arg: User1 | User2) {
  if (arg instanceof User1) {
    console.log(arg.foo); // OK
    console.log(arg.bar); // Error!
  }
  if (arg instanceof User2) {
    console.log(arg.foo); // Error!
    console.log(arg.bar); // OK
  }
  console.log(arg.common); // OK
  console.log(arg.foo); // Error!
  console.log(arg.bar); // Error!
}

check(new User1());
check(new User2());
```

## in
あるメンバーがクラスやオブジェクトに属しているかを調べる

```ts
type Engineer = {
  name: string;
  role: string;
}

type Designer = {
  name: string;
  tool: string;
}

type Job = Engineer | Designer

function checkJobs(job: Job) {
  // ここでjobはnameのみアクセス可
  if('role' in job) {
    // ここでjobはroleにもアクセス可
  }
  if('tool' in Job) {
    // ここでjobはtoolにもアクセス可
  }
}
```

## as (TS)
TypeScriptにおける**型アサーション(TypeAssertion)**です
assertionには主張という意味があります。
つまり型にasを指定して、「この型はこれだからね！」と
TypeScriptコンパイラに教えるようなイメージです。

```ts
// NonNullAssertion operatorの例
// const input = document.getElementById('input')!
const input = document.getElementById('input') as HTMLElement

// A as B でAで評価される型はBであると宣言できる。
```

# さいごに
記号ばかりで混乱してしまいそうですが以外とどれも使われるものだと思います。
特に`??`,`&&`,`||`の違いは上手に使い分けてバグを減らしたいところですね。
取り上げられていないものもあるかもしれません...

## おまけ
以下のコードの出力は何になるでしょうか！（ネタ）

```ts
const question = {
    '?': '?',
    '??': {
        '???': '???'
    }
};
console.log(question?.['??']?.['??'] ?? '????' ?? '?????');
```