import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {DevicesComponent} from '../devices/devices.component'
import { FavoritesPageRoutingModule } from './favorites-routing.module';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { FavoritesPage } from './favorites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule
  ],
  declarations: [FavoritesPage, ColorPickerComponent, DevicesComponent]
})
export class FavoritesPageModule {}
