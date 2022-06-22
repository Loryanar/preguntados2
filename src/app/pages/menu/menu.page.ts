import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private router: Router,
    ) { }

  goToNormal() {
    this.router.navigate(['normal']);
  }
  goToRush() {
    this.router.navigate(['rush']);
  }
  ngOnInit() {
  }

}
