import {Injectable} from "@angular/core";
import {KniffelCategories} from "../enums/kniffelCategories";
import {PointCategories} from "../enums/PointCategories";

@Injectable({
  providedIn: 'root'
})
export class KniffelGameHelperService {


  constructor() {
  }


  public getUpperBlocks(): KniffelCategories[] {
    return [
      KniffelCategories.ONES,
      KniffelCategories.TWOS,
      KniffelCategories.THREES,
      KniffelCategories.FOURS,
      KniffelCategories.FIVES,
      KniffelCategories.SIXES,
    ];
  }

  public getLowerBlock(): KniffelCategories[] {
    return [
      KniffelCategories.THREE_OF_A_KIND,
      KniffelCategories.FOUR_OF_A_KIND,
      KniffelCategories.FULL_HOUSE,
      KniffelCategories.SMALL_STREET,
      KniffelCategories.LARGE_STREET,
      KniffelCategories.KNIFFEL,
      KniffelCategories.CHANCE,
    ];
  }

  public getUpperBlockPoints(): PointCategories[] {
    return [
      PointCategories.UPPER_BLOCK_SUM,
      PointCategories.BONUS,
      PointCategories.TOTAL_UPPER_BLOCK_SUM,
    ];
  }

  public getLowerBlockPoints(withAbilities: boolean): PointCategories[] {
    return withAbilities ? [
      PointCategories.TOTAL_LOWER_BLOCK_SUM,
      PointCategories.TOTAL_UPPER_BLOCK_SUM,
      PointCategories.ABILITY_POINTS,
      PointCategories.TOTAL_SUM,
    ] : [
      PointCategories.TOTAL_LOWER_BLOCK_SUM,
      PointCategories.TOTAL_UPPER_BLOCK_SUM,
      PointCategories.TOTAL_SUM,
    ];
  }

}
