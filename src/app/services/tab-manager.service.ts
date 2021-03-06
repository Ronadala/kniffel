import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {GameTab} from "../enums/gameTab";

@Injectable({
  providedIn: 'root'
})
export class TabManagerService {

  selectedTab: GameTab = GameTab.START_MENU;
  tabUpdater: Subject<GameTab> = new Subject<GameTab>();

  constructor() {
  }

  public getSelectedTab(): GameTab {
    return this.selectedTab;
  }

  public getSubject(): Subject<GameTab> {
    return this.tabUpdater;
  }

  public updateTab(newTab: GameTab) {
    this.selectedTab = newTab;
    this.tabUpdater.next(this.selectedTab);
  }
}
