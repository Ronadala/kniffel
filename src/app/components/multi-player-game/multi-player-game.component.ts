import {Component, OnInit} from '@angular/core';
import {Player} from "../../classes/Player";
import {KniffelCategories} from "../../enums/kniffelCategories";
import {CategoryService} from "../../services/category.service";
import {PointCategories} from "../../enums/PointCategories";
import {Dice} from "../../classes/Dice";
import {DiceService} from "../../services/dice.service";

@Component({
  selector: 'app-multi-player-game',
  templateUrl: './multi-player-game.component.html',
  styleUrls: ['./multi-player-game.component.less']
})
export class MultiPlayerGameComponent implements OnInit {

  readonly categories = KniffelCategories;
  readonly pointCategories = PointCategories;
  readonly maxDiceCount: number = 5;

  public possibleRerolls!: number;
  maxRerolls: number = 3;
  playerTurn!: number;
  playerCount!: number;

  players: Player[] = [];
  upperBlock: KniffelCategories[] | undefined;
  lowerBlock: KniffelCategories[] | undefined;
  upperBlockPoints: PointCategories[] | undefined;
  lowerBlockPoints: PointCategories[] | undefined;
  dices: Dice[] = [];

  constructor(protected categoryService: CategoryService,
              protected diceService: DiceService,) {
  }

  ngOnInit(): void {
    this.loadConfig();

    this.createBlocks();
    this.createDices();

    this.initGame();
  }

  private loadConfig() {

    //todo do real config from menu
    this.players.push(new Player('steve', 1));
    this.players.push(new Player('steven', 2));

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

  private createDices() {
    for (let i = 1; i <= this.maxDiceCount; i++) {
      this.dices.push(new Dice());
    }
  }

  private initGame() {
    this.playerCount = this.players.length;
    this.playerTurn = 1;

    // first turn
    this.getPlayer(this.playerTurn)!.activeTurn = true;
    this.resetDice();
  }

  nextTurn() {
    this.getPlayer(this.playerTurn).activeTurn = false;

    if (this.playerTurn! >= this.playerCount!) {
      // back to player 1
      this.playerTurn = 1;
    } else {
      this.playerTurn++;
    }

    this.resetDice();

    this.getPlayer(this.playerTurn).activeTurn = true;
  }

  rollDice() {
    if (this.possibleRerolls > 0) {
      this.diceService.shuffleDice(this.dices);
      this.possibleRerolls--;
    }
  }

  private resetDice() {
    this.diceService.resetDice(this.dices);
    this.possibleRerolls = this.maxRerolls;
  }

  selectCategory(player: Player, category: KniffelCategories) {
    player.setCategoryValue(category, this.calculateValue(category));

    this.nextTurn();
  }

  calculateValue(category: KniffelCategories): number {
    return this.categoryService.getCalculatedValue(category, this.getDices());
  }


  getPlayer(index: number): Player {
    const player: Player = <Player>this.players.find(value => {
      return value.playerNumber == index;
    });
    return player;
  }

  private getDices(): number[] {
    return this.dices.map(dice => {
      return !!dice.value ? dice.value : 0
    });
  }

  getDiceImg(dice: number | undefined) {
    if (!dice) {
      console.error('the dice couldn\'t be found');
    }
    return '/assets/dices/dice_' + dice + '.gif';
  }

  toggleHoldDice(dice: Dice) {
    dice.holdBack = !dice.holdBack;
  }
}
