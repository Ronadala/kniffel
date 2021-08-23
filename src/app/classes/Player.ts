import {KniffelCategories} from "../enums/kniffelCategories";
import { PointCategories } from "../enums/PointCategories";
import {GeneralHelperService} from "../services/generalHelperService";

export class Player {

  public readonly name: string;
  private values: Map<KniffelCategories, number | null> = new Map<KniffelCategories, number | null>();
  private points: Map<PointCategories, number | null> = new Map<PointCategories, number | null>();
  public activeTurn: boolean = false;

  constructor(name: string) {
    this.name = name;

    this.initializeValues();
    this.initializePoints();
  }

  getCategoryValue(category: KniffelCategories): number {
    return <number>this.values.get(category);
  }

  getCategoryPoints(category: PointCategories) {
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

}
