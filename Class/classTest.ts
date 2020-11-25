abstract class Person {
  // 何も書かないとpublicとなる（明示的にpublicをつけることもできる）
  // name: string;
  // private - Class外からは参照できない
  // private age: number;
  // protected - Classの継承先のみで使用可能
  
  // static インスタンス生成せずに呼び出せる
  static species = 'Homo sapiens';
  static isAdult(age: number) {
    if(age >= 20) return true;
    return false;
  } 

  // ★constructorのパラメータを省略する書き方 (public name: string, public age: number)
  // readonly → パラメータを読み込み限定にする(どこからでも見える)
  constructor(public readonly name: string, protected age: number) { 
  }

  incrementAge() {
    this.age += 1;
  }

  greeting(this: Person) {
    console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`);
    this.explainJob();
  }

  abstract explainJob(): void;
}

// extendsによるクラス継承
class Teacher extends Person {
private static instance: Teacher;

  explainJob() {
    console.log(`I am a teacher and I teach ${this._subject}`)
  }
  // getter
  get subject(): string {
    if(!this._subject)  {
      throw new Error('There is no subject.');
    }
    return this._subject;
  }

  // setter
  set subject(value) {
    if(!value) {
      throw new Error('There is no value');
    }
    this._subject = value;
  }

  // 小クラス限定のフィールド[subject]を追加
  private constructor(name: string, age: number, private _subject: string) {
    super(name, age);
  }

  greeting() {
    console.log(`Hello! My name is ${this.name}. I am ${this.age} years old. ${this.subject} teacher.`);
  }

  static getInstance() {
    // 一番最初だけ、インスタンスを生成する。　それ以降は１回目に生成済みのインスタンスを返すというデザインパターン
    if(Teacher.instance) return Teacher.instance
    Teacher.instance = new Teacher('Jack', 38, 'Math');
    return Teacher.instance;
  }
}

// const teacher = new Teacher('Jack', 25, 'Math');
// console.log(teacher.subject);
// teacher.subject = 'Science';
// teacher.greeting();
// teacher.explainJob();

// シングルトンパターン
// 1.ClassのConstructorをprivateに
// 2.staticメソッドで所属クラス自身のインスタンスを返す処理
// 3.外部から2のstaticメソッドを呼びClassのインスタンスを取得

const teacher = Teacher.getInstance();
const teacher2 = Teacher.getInstance();
console.log(teacher, teacher2);