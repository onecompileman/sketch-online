import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSketchPagePageRoutingModule } from './create-sketch-page-routing.module';

import { CreateSketchPagePage } from './create-sketch-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateSketchPagePageRoutingModule,
  ],
  declarations: [CreateSketchPagePage],
})
export class CreateSketchPagePageModule {}
