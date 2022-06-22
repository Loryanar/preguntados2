import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NormalPageRoutingModule } from './normal-routing.module';

import { NormalPage } from './normal.page';
import { TabsModule } from 'src/app/components/tabs/tabs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NormalPageRoutingModule,
    TabsModule,
  ],
  declarations: [NormalPage]
})
export class NormalPageModule {}
