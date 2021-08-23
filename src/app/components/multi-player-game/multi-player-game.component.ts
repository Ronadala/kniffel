import {Component, OnInit} from '@angular/core';
import {Player} from "../../classes/Player";
import {KniffelCategories} from "../../enums/kniffelCategories";
import {CategoryService} from "../../services/CategoryService";
import {PointCategories} from "../../enums/PointCategories";

@Component({
  selector: 'app-multi-player-game',
  templateUrl: './multi-player-game.component.html',
  styleUrls: ['./multi-player-game.component.less']
})
export class MultiPlayerGameComponent implements OnInit {

  readonly categories = KniffelCategories;
  readonly pointCategories = PointCategories;

  players: Player[] = [];
  upperBlock: KniffelCategories[] | undefined;
  lowerBlock: KniffelCategories[] | undefined;
  upperBlockPoints: PointCategories[] | undefined;
  lowerBlockPoints: PointCategories[] | undefined;
  dices: number[] = [];

  constructor(protected categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.players.push(new Player('steve'));

    this.createBlocks();
  }

  private createBlocks() {
    this.upperBlock = [
      this.categories.ONES,
      this.categories.TWOS,
      this.categories.THREES,
      this.categories.FOURS,
      this.categories.FIVES,
      this.categories.SIXES,
    ];

    this.lowerBlock = [
      this.categories.THREE_OF_A_KIND,
      this.categories.FOUR_OF_A_KIND,
      this.categories.FULL_HOUSE,
      this.categories.SMALL_STREET,
      this.categories.LARGE_STREET,
      this.categories.KNIFFEL,
      this.categories.CHANCE,
    ];

    this.upperBlockPoints = [
      this.pointCategories.UPPER_BLOCK_SUM,
      this.pointCategories.BONUS,
      this.pointCategories.TOTAL_UPPER_BLOCK_SUM,
    ];

    this.lowerBlockPoints = [
      this.pointCategories.TOTAL_LOWER_BLOCK_SUM,
      this.pointCategories.TOTAL_UPPER_BLOCK_SUM,
      this.pointCategories.TOTAL_SUM,
    ];

  }

  selectCategory(player: Player, category: KniffelCategories) {
    // todo select category and assign value
  }

  calculateValue(category: KniffelCategories): number {
    return this.categoryService.getCalculatedValue(category, this.dices);
  }
}
