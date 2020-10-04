import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';
import { LongPressModule } from 'ionic-long-press';
import { RoomPage } from './room.page';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import {DevicesComponent} from '../devices/devices.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomPageRoutingModule,
    LongPressModule
  ],
  declarations: [RoomPage, ColorPickerComponent,DevicesComponent ]
})
export class RoomPageModule {}
