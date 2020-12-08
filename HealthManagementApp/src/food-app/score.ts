import { Scoreable } from "./interfaces.js";
import { Foods } from "./foods.js";

export class Score implements Scoreable { 
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