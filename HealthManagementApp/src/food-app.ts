interface Scoreable {
  readonly totalScore: number;
  render(): void;
}

interface Foodable {
  element: HTMLDivElement;
  clickEventHandler(): void;
}

interface Foodsable {
  elements: NodeListOf<HTMLDivElement>
  readonly activeElements: HTMLDivElement[];
  readonly activeElementsScore: number[];

}

class Score implements Scoreable { 
  private static instance: Score;
  get totalScore() {
    const foods = Foods.getInstance();
    return foods.activeElementsScore.reduce((total, score) => total + score , 0)
  }
  private constructor() {}
  render() {
    document.querySelector('.score__number')!.textContent = String(this.totalScore);
  }
  static getInstance() {
    if(!Score.instance) {
      Score.instance = new Score();
    }
    return Score.instance;
  }
}
class Food implements Foodable { 
  // Foodsから受け取ったElement全てにClickイベントリスナの登録
  constructor(public element: HTMLDivElement) {
    // コールバック関数でthisを使用する場合はbindを使用する
    element.addEventListener('click', this.clickEventHandler.bind(this));
  }
  clickEventHandler() {
    // elementにfood-activeクラスがあったらとる、なかったらつける
    this.element.classList.toggle('food--active');
    const score = Score.getInstance();
    score.render();
  }
}
class Foods implements Foodsable{
  // シングルトンパターン
  private static instance: Foods 
  // div要素であることをTSに伝える(querySelectorAllはジェネリクス)
  elements = document.querySelectorAll<HTMLDivElement>('.food');
  private _activeElements: HTMLDivElement[] = [];
  private _activeElementsScore: number[] = [];
  get activeElements() {
    this._activeElements = [];
    this.elements.forEach(element => {
      if(element.classList.contains('food--active')) {
        this._activeElements.push(element);
      }
    })
    return this._activeElements;
  }
  get activeElementsScore() {
     this._activeElementsScore = [];
     this.activeElements.forEach(element => {
       const foodScore = element.querySelector('.food__score');
       if(foodScore) {
         this._activeElementsScore.push(Number(foodScore.textContent));
       }
     })
     return this._activeElementsScore;
  }
  // constructorを隠蔽し、外部からはFoods.getInstanceを呼び出す
  private constructor() {
    this.elements.forEach(element => {
      // 責務を分離する
      // Foodのコンストラクタ関数に取得したDivElementを渡してそちらで処理
      new Food(element)
    })
  }
  static getInstance() {
    if(!Foods.instance) {
      Foods.instance = new Foods();
    }
    return Foods.instance;
  }
}  
const foods = Foods.getInstance();