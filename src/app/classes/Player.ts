import {KniffelCategories} from "../enums/kniffelCategories";
import {GeneralHelperService} from "../services/generalHelperService";

export class Player {

  public readonly name: string;
  private values: Map<KniffelCategories, number | null> = new Map<KniffelCategories, number | null>();
  public activeTurn: boolean = false;

  constructor(name: string) {
    this.name = name;

    this.initializeValues();
  }

  getCategoryValue(category: KniffelCategories): number {
    return <number>this.values.get(category);
  }

  private initializeValues() {
    const categories: KniffelCategories[] = GeneralHelperService.ToArray(KniffelCategories)

    for (let category of categories) {
      this.values.set(category, null);
    }

  }
}
