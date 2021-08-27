import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StartMenuComponent} from './components/start-menu/start-menu.component';
import {MultiPlayerGameComponent} from './components/multi-player-game/multi-player-game.component';
import {KniffelComponent} from './components/kniffel/kniffel.component';
import {ConfigComponent} from './components/config/config.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    KniffelComponent,
    StartMenuComponent,
    MultiPlayerGameComponent,
    ConfigComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
