import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabsComponent} from './tabs.component'
import { BodyComponent } from '../body/body.component';
import { BodyrComponent } from '../bodyr/bodyr.component';

@NgModule({
  declarations: [TabsComponent,
    BodyrComponent,
BodyComponent],
   exports:[
    TabsComponent,
    BodyrComponent,
    BodyComponent
  ],
  imports: [
    CommonModule
  ],
 
})
export class TabsModule { }
