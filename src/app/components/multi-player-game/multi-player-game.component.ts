import { Component, OnInit } from '@angular/core';
import {Player} from "../../classes/Player";

@Component({
  selector: 'app-multi-player-game',
  templateUrl: './multi-player-game.component.html',
  styleUrls: ['./multi-player-game.component.less']
})
export class MultiPlayerGameComponent implements OnInit {
  players: Player[] = [];

  constructor() { }

  ngOnInit(): void {
    this.players.push(new Player('steve'));
  }

}
