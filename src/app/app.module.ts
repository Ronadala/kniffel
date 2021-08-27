import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StartMenuComponent} from './components/start-menu/start-menu.component';
import {KniffelGameComponent} from './components/kniffel-game/kniffel-game.component';
import {KniffelContainerComponent} from './components/kniffel-container/kniffel-container.component';
import {ConfigComponent} from './components/config/config.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    KniffelContainerComponent,
    StartMenuComponent,
    KniffelGameComponent,
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
