import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'user',
    component: PagesComponent
  },
  {
    path: '',
    component:UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
