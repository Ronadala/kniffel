import {Component, OnInit} from '@angular/core';
import {GameTab} from "../../enums/gameTab";
import {TabManagerService} from "../../services/tab-manager.service";
import {GameMode} from "../../enums/gameMode";

@Component({
  selector: 'app-kniffel-container',
  templateUrl: './kniffel-container.component.html',
  styleUrls: ['./kniffel-container.component.less']
})
export class KniffelContainerComponent implements OnInit {

  readonly START_MENU = GameTab.START_MENU;
  readonly SINGLE_PLAYER_CONFIG = GameTab.SINGLE_PLAYER_CONFIG;
  readonly MULTI_PLAYER_CONFIG = GameTab.MULTI_PLAYER_CONFIG;
  readonly KNIFFEL_GAME = GameTab.KNIFFEL_GAME;
  readonly RESULT = GameTab.RESULT;

  readonly SINGLE_PLAYER = GameMode.SINGLE_PLAYER;
  readonly MULTI_PLAYER = GameMode.MULTI_PLAYER;

  tab: GameTab = GameTab.START_MENU;

  constructor(protected tabService: TabManagerService) {
  }

  ngOnInit(): void {
    this.tab = this.tabService.getSelectedTab();
    this.tabService.getSubject().subscribe((newTab: GameTab) => {
      this.tab = newTab;
    });
  }

  backToMenu(): void {
    this.tabService.updateTab(GameTab.START_MENU);
  }

}
