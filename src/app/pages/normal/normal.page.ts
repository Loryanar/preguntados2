import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-normal',
  templateUrl: './normal.page.html',
  styleUrls: ['./normal.page.scss'],
})
export class NormalPage implements OnInit{

 Start =false;
 loading = false;
 time: any;

  constructor() {
    
  }
 ngOnInit() {
     
 }





}
