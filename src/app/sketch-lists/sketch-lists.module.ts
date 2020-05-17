import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SketchListsPageRoutingModule } from './sketch-lists-routing.module';

import { SketchListsPage } from './sketch-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SketchListsPageRoutingModule
  ],
  declarations: [SketchListsPage]
})
export class SketchListsPageModule {}
