import { readFile } from "fs/promises";
// ============= ES2015 から =============

// 👮‍♂️ Promise.all 「Promise関数の配列を受け取り、結果をそれぞれのタプルで返す。 ★どれかがエラーになった場合はPromise.allが返したPromiseもその時点で失敗になる」
// ...

// 👮‍♂️ Promise.race 「一番先にfulfillしたPromiseの戻り値を採用する。ただし一番最初にどれかがrejectになった場合はそれを採用する」
// 指定秒数後に必ず失敗するPromiseObject
const sleepReject = (duration: number) => {
  return new Promise<never>((_resolve, reject) => {
      setTimeout(reject, duration)
  })
}

// sleepRejectを使うことで擬似的に再現した「5000msでタイムアウトされる非同期処理の実装」
const p = Promise.race([
  readFile("foo.txt", "utf8"),
  sleepReject(5000)
])

p.then((result) => {
  console.log("Success: ", result)
})

// ⭐ catchのerr引数は暗黙的にanyになるためunknownで上書きをしておいたほうがよい
p.catch((err: unknown) => {
  console.log("Failed: ", err)
})

// ============= ES2015より後からの新しいメソッド ============= 

// 👮‍♂️ Promise.allSettled「allとほぼ同じだが、いずれかの非同期処理が失敗した場合も全てのPromiseの結果が出るまで待つ」
// 「また戻り値がこの形式になる [{ status: "fulfilled", value: 結果の値 }, { status: "rejected", reason: 結果の値 } ]」

// 👮‍♂️ Promise.any 「渡されたPromiseのいずれかが成功した時点でany()の戻り値も成功になる。(raceと違って失敗しても無視して続ける)」