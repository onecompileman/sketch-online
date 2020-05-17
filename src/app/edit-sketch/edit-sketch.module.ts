import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSketchPageRoutingModule } from './edit-sketch-routing.module';

import { EditSketchPage } from './edit-sketch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditSketchPageRoutingModule,
  ],
  declarations: [EditSketchPage],
})
export class EditSketchPageModule {}
