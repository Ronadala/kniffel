import {Injectable} from "@angular/core";
import {Player} from "../classes/Player";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  playerList: Player[] = [];

  constructor() {
  }

  public setPlayer(playerList: Player[]) {
    this.playerList = playerList;
  }

  public getPlayerList(): Player[] {
    return this.playerList;
  }
}
