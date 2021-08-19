import {Component, OnInit} from '@angular/core';
import {GameTab} from "../../enums/gameTab";
import {TabManagerService} from "../../services/tab-manager.service";

@Component({
  selector: 'app-kniffel',
  templateUrl: './kniffel.component.html',
  styleUrls: ['./kniffel.component.less']
})
export class KniffelComponent implements OnInit {

  readonly START_MENU = GameTab.START_MENU;
  readonly SINGLE_PLAYER = GameTab.SINGLE_PLAYER;
  readonly MULTI_PLAYER = GameTab.MULTI_PLAYER;
  readonly RESULT = GameTab.RESULT;
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
