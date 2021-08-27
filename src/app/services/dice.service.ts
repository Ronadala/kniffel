import {Injectable} from "@angular/core";
import {Dice} from "../classes/Dice";

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() {
  }

  public getRandomDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  public shuffleDice(dices: Dice[]) {
    for (let dice of dices) {
      if (!dice.holdBack) {
        dice.value = this.getRandomDice();
      }
    }
  }

  public resetDice(dices: Dice []) {
    for (let dice of dices) {
      dice.value = 0;
      dice.holdBack = false;
    }
  }
}
