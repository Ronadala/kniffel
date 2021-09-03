import {Component, OnInit} from '@angular/core';
import {Player} from "../../classes/Player";
import {KniffelCategories} from "../../enums/kniffelCategories";
import {CategoryService} from "../../services/category.service";
import {PointCategories} from "../../enums/PointCategories";
import {Dice} from "../../classes/Dice";
import {DiceService} from "../../services/dice.service";
import {ConfigurationService} from "../../services/configuration.service";
import {TabManagerService} from "../../services/tab-manager.service";
import {KniffelGameHelperService} from "../../services/kniffel-game-helper.service";

@Component({
  selector: 'app-kniffel-game',
  templateUrl: './kniffel-game.component.html',
  styleUrls: ['./kniffel-game.component.less']
})
export class KniffelGameComponent implements OnInit {

  readonly categories = KniffelCategories;
  readonly pointCategories = PointCategories;
  readonly maxDiceCount: number = 5;

  public possibleRerolls!: number;
  maxRerolls: number = 3;
  playerTurn!: number;
  playerCount!: number;

  playerList: Player[] = [];
  upperBlock: KniffelCategories[] | undefined;
  lowerBlock: KniffelCategories[] | undefined;
  upperBlockPoints: PointCategories[] | undefined;
  lowerBlockPoints: PointCategories[] | undefined;
  dices: Dice[] = [];
  gameOver: boolean = false;
  activeAbilities: boolean = false;

  constructor(protected diceService: DiceService,
              protected configService: ConfigurationService,
              protected tabService: TabManagerService,
              protected kniffelHelper: KniffelGameHelperService,) {
  }

  ngOnInit(): void {
    this.loadConfig();

    this.createBlocks();
    this.createDices();

    this.initGame();
  }

  private loadConfig() {
    this.playerList = this.configService.getPlayerList();
    this.activeAbilities = this.configService.getAbilities();
  }

  private createBlocks() {
    this.upperBlock = this.kniffelHelper.getUpperBlocks();

    this.lowerBlock = this.kniffelHelper.getLowerBlock();

    this.upperBlockPoints = this.kniffelHelper.getUpperBlockPoints();

    this.lowerBlockPoints = this.kniffelHelper.getLowerBlockPoints(this.activeAbilities);

  }

  private createDices() {
    for (let i = 1; i <= this.maxDiceCount; i++) {
      this.dices.push(new Dice());
    }
  }

  private initGame() {
    this.playerCount = this.playerList.length;
    this.playerTurn = 1;

    // first turn
    this.getPlayer(this.playerTurn)!.activeTurn = true;
    this.resetDice();
  }

  nextTurn() {
    this.getPlayer(this.playerTurn).activeTurn = false;
    if (this.playerCount > 1) {

      if (this.playerTurn! >= this.playerCount!) {
        // back to player 1
        this.playerTurn = 1;
      } else {
        this.playerTurn++;
      }
    }

    this.resetDice();

    this.getPlayer(this.playerTurn).activeTurn = true;
  }

  rollDice() {
    this.diceService.shuffleDice(this.dices);
    this.possibleRerolls--;
  }

  private resetDice() {
    this.diceService.resetDice(this.dices);
    this.possibleRerolls = this.maxRerolls;
  }

  selectCategory(player: Player, category: KniffelCategories) {
    player.setCategoryValue(category, this.calculateValue(category));

    if (player.isPlayerDone() && player.playerNumber === this.playerCount) {
      this.gameOver = true;
    } else {
      this.nextTurn();
    }
  }

  calculateValue(category: KniffelCategories): number {
    return CategoryService.getCalculatedValue(category, this.getDices());
  }

  getPlayer(index: number): Player {
    const player: Player = <Player>this.playerList.find(value => {
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

  isShuffleDeactivated() {
    return this.possibleRerolls <= 0 || this.gameOver;
  }

  extraRoll() {
    this.getPlayer(this.playerTurn).updateAbilityPoints(-5);
    this.possibleRerolls++;
  }
}
