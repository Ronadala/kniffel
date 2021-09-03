import {Injectable} from "@angular/core";
import {Player} from "../classes/Player";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  playerList: Player[] = [];
  aktivAbilities: boolean = false;

  constructor() {
  }

  public setPlayer(playerList: Player[]) {
    this.playerList = playerList;
  }

  public getPlayerList(): Player[] {
    return this.playerList;
  }

  setAbilities(activateAbilities: boolean) {
    this.aktivAbilities = activateAbilities;
  }

  getAbilities(): boolean {
    return this.aktivAbilities;
  }
}
