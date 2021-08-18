import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { StartMenuComponent } from './components/start-menu/start-menu.component';
import { SinglePlayerGameComponent } from './components/single-player-game/single-player-game.component';
import { MultiPlayerGameComponent } from './components/multi-player-game/multi-player-game.component';

@NgModule({
  declarations: [
    AppComponent,
    StartMenuComponent,
    SinglePlayerGameComponent,
    MultiPlayerGameComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}