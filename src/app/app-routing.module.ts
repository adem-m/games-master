import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MorpionComponent } from './morpion/morpion.component';
import { GridComponent } from './grid/grid.component';


const routes: Routes = [
  { path: 'morpion', component: MorpionComponent},
  { path: 'rowMaster', component: GridComponent},
  { path: '', component: GridComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
