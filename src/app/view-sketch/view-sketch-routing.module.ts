import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSketchPage } from './view-sketch.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSketchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSketchPageRoutingModule {}
