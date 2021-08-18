import {Component, OnInit} from '@angular/core';
import {TabManagerService} from "../../services/tab-manager.service";
import {GameTab} from "../../enums/gameTab";

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.less']
})
export class StartMenuComponent implements OnInit {

  constructor(protected tabService: TabManagerService) {
  }

  ngOnInit(): void {
  }

  clickedSinglePlayer() {
    this.tabService.updateTab(GameTab.SINGLE_PLAYER);
  }

  clickedMultiPlayer() {
    this.tabService.updateTab(GameTab.MULTI_PLAYER);
  }
}
