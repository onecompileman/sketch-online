import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SketchListsPage } from './sketch-lists.page';

const routes: Routes = [
  {
    path: '',
    component: SketchListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SketchListsPageRoutingModule {}
