import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MorpionComponent } from './morpion/morpion.component';
import { GridComponent } from './grid/grid.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: 'grid-master', component: MorpionComponent},
  { path: 'row-master', component: GridComponent},
  { path: '', component: GridComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
