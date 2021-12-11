import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './drinks/list/list.component';
import { AddComponent } from './drinks/add/add.component';


const routes: Routes = [
  { path: '',  redirectTo: '/drinks/list', pathMatch: 'full' },
  { path: 'drinks/list', component: ListComponent },
  { path: 'drinks/add', component: AddComponent },
  { path: 'drinks/edit/:order', component: AddComponent },
  { path: '**', redirectTo: '/drinks/list'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
