import { Foodable } from "./interfaces";
import { Score } from "./score";

export class Food implements Foodable { 
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