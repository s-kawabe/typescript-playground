class Human {
  constructor(public name: string, public age: number) {}

  greeting() {
    console.log(`${this.name},${this.age}`);
  }
}

const human = new Human('bob',40);
human.greeting();