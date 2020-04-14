import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { MorpionComponent } from './morpion/morpion.component';
import { NameChoiceComponent } from './name-choice/name-choice.component';
import { GrilleComponent } from './grille/grille.component';
import { ScoreComponent } from './score/score.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    MorpionComponent,
    NameChoiceComponent,
    GrilleComponent,
    ScoreComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
