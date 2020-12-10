import { Foodsable } from "./interfaces.js";
import { Food } from "./food";

export class Foods implements Foodsable{
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