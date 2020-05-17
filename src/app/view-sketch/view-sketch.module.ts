import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSketchPageRoutingModule } from './view-sketch-routing.module';

import { ViewSketchPage } from './view-sketch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSketchPageRoutingModule
  ],
  declarations: [ViewSketchPage]
})
export class ViewSketchPageModule {}
