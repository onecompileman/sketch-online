import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MySketchListPage } from './my-sketch-list.page';

const routes: Routes = [
  {
    path: '',
    component: MySketchListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySketchListPageRoutingModule {}
