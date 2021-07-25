class Human {
  public name: string
  public age: number

  constructor(
    name: string,
    age: number
  ) {
    this.name = name
    this.age = age
  }

  talk() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}

class Student extends Human {
  public job: string
  constructor(
    job: string,
    name: string,
    age: number
  ) {
    super(name, age) //⭐️
    this.job = job
  }

  talk() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.
      My job is ${this.job}.`)
  }

  talk2() {
    super.talk() //⭐️
  }
}