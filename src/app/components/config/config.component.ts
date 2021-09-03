import {Component, Input} from '@angular/core';
import {GameMode} from "../../enums/gameMode";
import {GameTab} from "../../enums/gameTab";
import {TabManagerService} from "../../services/tab-manager.service";
import {Player} from "../../classes/Player";
import {ConfigurationService} from "../../services/configuration.service";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.less']
})
export class ConfigComponent {

  @Input() gameMode: GameMode | undefined;

  playerList: Player[] = [new Player()];
  private playerNumberCounter: number = 1;
  activateAbilities: boolean = false;

  constructor(
    protected tabService: TabManagerService,
    protected configService: ConfigurationService) {
  }

  isPlayerAddAllowed(): boolean {
    return this.gameMode === GameMode.MULTI_PLAYER;
  }

  clickedAddPlayer() {
    const newPlayer = new Player();
    newPlayer.playerNumber = this.playerNumberCounter++;
    this.playerList.push(newPlayer);
  }

  clickedRemovePlayer(player: Player) {
    this.playerList = this.playerList.filter(value => {
      return value.playerNumber !== player.playerNumber;
    })
  }

  navigateToGame() {
    this.tabService.updateTab(GameTab.KNIFFEL_GAME);
  }

  clickedStartGame() {
    this.setPlayerNumbers();

    this.configService.setPlayer(this.playerList);
    this.configService.setAbilities(this.activateAbilities);

    this.navigateToGame();
  }

  private setPlayerNumbers() {
    let counter = 1;
    for (let player of this.playerList) {
      player.playerNumber = counter;
      counter++;
    }
  }

}
