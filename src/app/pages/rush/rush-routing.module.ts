import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RushPage } from './rush.page';

const routes: Routes = [
  {
    path: '',
    component: RushPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RushPageRoutingModule {}
