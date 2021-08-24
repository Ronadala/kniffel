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
      case KniffelCategories.THREE_OF_A_KIND:
        return CategoryService.calculateThreeOfAKind(dices);
      case KniffelCategories.FOUR_OF_A_KIND:
        return CategoryService.calculateFourOfAKind(dices);
      case KniffelCategories.FULL_HOUSE:
        return CategoryService.calculateFullHouse(dices);
      case KniffelCategories.SMALL_STREET:
        return CategoryService.calculateSmallStreet(dices);
      case KniffelCategories.LARGE_STREET:
        return CategoryService.calculateLargeStreet(dices);
      case KniffelCategories.KNIFFEL:
        return CategoryService.calculateKniffel(dices);
      case KniffelCategories.CHANCE:
        return CategoryService.calculateChance(dices);

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
    return this.calculateXOfAKind(3, dices);
  }

  private static calculateFourOfAKind(dices: number[]): number {
    return this.calculateXOfAKind(4, dices);
  }

  private static calculateFullHouse(dices: number[]): number {
    let twoOfAKind: boolean = false;
    let threeOfAKind: boolean = false;

    for (let i = 1; i <= 6; i++) {
      let numberOfDices = this.countArrayForNumber(i, dices);
      if (!threeOfAKind && numberOfDices === 3) {
        threeOfAKind = true;
      } else if (!twoOfAKind && numberOfDices === 2) {
        twoOfAKind = true;
      }
    }

    return twoOfAKind && threeOfAKind ? categoryPoints.FULL_HOUSE : 0;
  }

  private static calculateSmallStreet(dices: number[]): number {
    if (this.containsDices(dices, 3, 4)) {
      if (this.containsDices(dices, 1, 2)
        || this.containsDices(dices, 2, 5)
        || this.containsDices(dices, 5, 6)) {
        return categoryPoints.SMALL_STREET;
      }
    }
    return categoryPoints.NULL;
  }

  private static calculateLargeStreet(dices: number[]): number {
    if (this.containsDices(dices, 2, 3, 4, 5)) {
      if (dices.includes(1) || dices.includes(6)) {
        return categoryPoints.LARGE_STREET;
      }
    }
    return categoryPoints.NULL;
  }

  private static calculateKniffel(dices: number[]): number {
    return this.hasXOfAKind(5, dices) ? categoryPoints.KNIFFEL : categoryPoints.NULL;
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

  private static countArrayForNumber(searchedForDice: number, dices: number[]) {
    return dices.reduce((counter, dice) => {
      if (dice === searchedForDice) counter += 1
      return counter;
    }, 0);
  }

  private static sumAllEyes(dices: number[]) {
    let sum: number = 0;
    dices.forEach(dice => sum += dice);
    return sum;
  }

  private static containsDices(dices: number[], ...args: number[]): boolean {
    for (let arg of args) {
      if (!dices.includes(arg)) {
        return false;
      }
    }
    return true;
  }
}
