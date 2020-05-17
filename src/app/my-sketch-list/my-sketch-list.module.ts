import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MySketchListPageRoutingModule } from './my-sketch-list-routing.module';

import { MySketchListPage } from './my-sketch-list.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MySketchListPageRoutingModule,
    SharedModule,
  ],
  declarations: [MySketchListPage],
})
export class MySketchListPageModule {}
