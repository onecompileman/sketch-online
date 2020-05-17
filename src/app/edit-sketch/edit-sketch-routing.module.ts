import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSketchPage } from './edit-sketch.page';

const routes: Routes = [
  {
    path: '',
    component: EditSketchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSketchPageRoutingModule {}
