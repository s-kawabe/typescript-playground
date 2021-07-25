class Set {
  has(value: number): boolean {
    // valueがSetに存在すればtrueを返す
  }
  add(value: number): this {
    // valueをSetに追加し、追加後のSetを返す
  }
}

let set = new Set
set.add(1).add(2).add(3)
set.has(2) // true
set.has(4) // false