import {  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  name: string;
  password: string;
  error: string;
  loading = false;

  goToMenu() {
    this.router.navigate(['menu']);
  }
  async register() {
    this.loading = true;
    const registered = await this.auth.register({
      name: this.name,
      password: this.password,
    });
    if (registered) {
      this.goToMenu();
    } else {
      this.error = 'User already exists';
    }
    this.loading = false;
  }

  ngOnInit() {
    this.cd.detectChanges();
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
}
