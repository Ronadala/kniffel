import {KniffelCategories} from "../enums/kniffelCategories";
import {PointCategories} from "../enums/PointCategories";
import {GeneralHelperService} from "../services/general-helper.service";
import {CategoryService} from "../services/category.service";

export class Player {

  public name: string = '';
  private values: Map<KniffelCategories, number | null> = new Map<KniffelCategories, number | null>();
  private points: Map<PointCategories, number | null> = new Map<PointCategories, number | null>();
  public activeTurn: boolean = false;
  public playerNumber: number = 0;

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.initializeValues();
    this.initializePoints();
  }

  public getCategoryValue(category: KniffelCategories): number {
    return <number>this.values.get(category);
  }

  public getCategoryPoints(category: PointCategories) {
    return <number>this.points.get(category);
  }

  private initializeValues() {
    const categories: KniffelCategories[] = GeneralHelperService.ToArray(KniffelCategories)

    for (let category of categories) {
      this.values.set(category, null);
    }
  }

  private initializePoints() {
    const categories: PointCategories[] = GeneralHelperService.ToArray(PointCategories)

    for (let category of categories) {
      this.points.set(category, 0);
    }
  }

  setCategoryValue(category: KniffelCategories, value: number) {
    this.values.set(category, value);
    this.calculatePoints();
  }

  private calculatePoints() {
    this.points.set(PointCategories.UPPER_BLOCK_SUM, CategoryService.calculateUpperBlockSum(this));
    this.points.set(PointCategories.BONUS, CategoryService.calculateBonus(this));
    this.points.set(PointCategories.TOTAL_UPPER_BLOCK_SUM, CategoryService.calculateTotalUpperBlockSum(this));
    this.points.set(PointCategories.TOTAL_LOWER_BLOCK_SUM, CategoryService.calculateTotalLowerBlockSum(this));
    this.points.set(PointCategories.TOTAL_SUM, CategoryService.calculateTotalSum(this));
  }

  isPlayerDone(): boolean {
    for (let value of this.values) {
      if (value === null) {
        return false;
      }
    }
    return true;
  }
}
