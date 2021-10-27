// 配列Tを受け取り、その最初のプロパティの型を返すFirst<T>を実装します。

type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]
type notArray = []

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
type head3 = First<notArray>

// my answer
// type First<T extends any[]> = T[0]

// other developer answer
// 空配列の場合はnever型が指定されるようにする。
type First<T extends any[]> = T extends [] ? never : T[0]