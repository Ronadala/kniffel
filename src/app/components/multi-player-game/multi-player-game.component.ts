import { Component, OnInit } from '@angular/core';
import {Player} from "../../classes/Player";
import {KniffelCategories} from "../../enums/kniffelCategories";
import {CategoryService} from "../../services/CategoryService";

@Component({
  selector: 'app-multi-player-game',
  templateUrl: './multi-player-game.component.html',
  styleUrls: ['./multi-player-game.component.less']
})
export class MultiPlayerGameComponent implements OnInit {

  readonly categories = KniffelCategories;

  players: Player[] = [];
  upperBlock: KniffelCategories[] | undefined;
  lowerBlock: KniffelCategories[] | undefined;
  dices: number[] = [];

  constructor(protected categoryService: CategoryService) { }

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
    ]

    this.lowerBlock = [
      this.categories.THREE_OF_A_KIND,
      this.categories.FOUR_OF_A_KIND,
      this.categories.FULL_HOUSE,
      this.categories.SMALL_STRAIGHT,
      this.categories.LARGE_STRAIGHT,
      this.categories.KNIFFEL,
      this.categories.CHANCE,
    ]
  }

  selectCategory(player: Player, category: KniffelCategories) {
    // todo select category and assign value
  }

  calculateValue(category: KniffelCategories): number {
    return this.categoryService.getCalculatedValue(category, this.dices);
  }
}
