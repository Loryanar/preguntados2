import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RushPageRoutingModule } from './rush-routing.module';

import { RushPage } from './rush.page';
import { TabsModule } from 'src/app/components/tabs/tabs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RushPageRoutingModule,  
    TabsModule,
  ],
  declarations: [RushPage]
})
export class RushPageModule {}
