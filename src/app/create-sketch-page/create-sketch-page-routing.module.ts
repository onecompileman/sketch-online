import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSketchPagePage } from './create-sketch-page.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSketchPagePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSketchPagePageRoutingModule {}
