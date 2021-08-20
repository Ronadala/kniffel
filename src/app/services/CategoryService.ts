import {Injectable} from '@angular/core';
import {KniffelCategories} from "../enums/kniffelCategories";
import {categoryPoints} from "../enums/categoryPoints";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor() {
  }

  getCalculatedValue(category: KniffelCategories, dices: number []): number {
    switch (category) {
      default:
        return categoryPoints.NULL;
      case KniffelCategories.ONES:
        return CategoryService.calculateSingleDigits(1, dices);
      case KniffelCategories.TWOS:
        return CategoryService.calculateSingleDigits(2, dices);
      case KniffelCategories.THREES:
        return CategoryService.calculateSingleDigits(3, dices);
      case KniffelCategories.FOURS:
        return CategoryService.calculateSingleDigits(4, dices);
      case KniffelCategories.FIVES:
        return CategoryService.calculateSingleDigits(5, dices);
      case KniffelCategories.SIXES:
        return CategoryService.calculateSingleDigits(6, dices);

    }
  }

  private static calculateSingleDigits(searchedForDice: number, dices: number[]): number {
    let value = 0;
    for (let dice of dices) {
      if (dice === searchedForDice) {
        value += searchedForDice;
      }
    }
    return value;
  }

  private static calculateThreeOfAKind(dices: number[]): number {
    return this.calculateXOfAKind(4, dices);
  }

  private static calculateFourOfAKind(dices: number[]): number {
    return this.calculateXOfAKind(4, dices);
  }

  private static calculateFullHouse(dices: number[]): number {
    let twoOfAKind: boolean = false;
    let threeOfAKind: boolean = false;


    let numberOfDices: number;

    for (let i = 1; i <= 6; i++) {
      let numberOfDices = this.countArrayForNumber(i, dices);
      if (numberOfDices >= 2) {

      }
    }

    return twoOfAKind && threeOfAKind ? 25 : 0;
  }

  private static calculateSmallStreet(dices: number[]): number {

    return 0;
  }

  private static calculateLargeStreet(dices: number[]): number {
    return 0;
  }

  private static calculateKniffel(dices: number[]): number {
    return this.hasXOfAKind(5, dices) ? categoryPoints.KNIFFEL: categoryPoints.NULL;
  }

  private static calculateChance(dices: number[]): number {
    return this.sumAllEyes(dices)
  }

  //Helper Methods for the category calculation
  private static calculateXOfAKind(x: number, dices: number[]): number {
    for (let i = 1; i <= 6; i++) {
      let numberOfDices = this.countArrayForNumber(i, dices);
      if (numberOfDices >= x) {
        return this.sumAllEyes(dices);
      }
    }
    return 0;
  }

  private static hasXOfAKind(x: number, dices: number[]): boolean {
    for (let i = 1; i <= 6; i++) {
      let numberOfDices = this.countArrayForNumber(i, dices);
      if (numberOfDices >= x) {
        return true;
      }
    }
    return false;
  }

  private static hasExactlyXOfAKind(x: number, dices: number[]): boolean {
    for (let i = 1; i <= 6; i++) {
      let numberOfDices = this.countArrayForNumber(i, dices);
      if (numberOfDices === x) {
        return true;
      }
    }
    return false;
  }

  private static countArrayForNumber(searchedForDice: number, dices: number[]) {
    return dices.reduce((counter, dice) => {
      if (dice === searchedForDice) counter += 1
      return counter;
    }, 0);
  }

  private static sumAllEyes(dices: number[])
  {
    let sum: number = 0;
    dices.forEach(dice => sum += dice);
    return sum;
  }
}
