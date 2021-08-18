import { Component, OnInit } from '@angular/core';
import {GameTab} from "../../enums/gameTab";

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

  constructor() { }

  ngOnInit(): void {
  }

}
