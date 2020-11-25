"use strict";
class Human {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greeting() {
        console.log(`${this.name},${this.age}`);
    }
}
const human = new Human('bob', 40);
human.greeting();
