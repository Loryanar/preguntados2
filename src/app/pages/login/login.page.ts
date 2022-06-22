import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoggedinGuard } from 'src/app/guards/loggedin.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading = false;

  constructor(private router: Router, private auth: AuthService, private tok: LoggedinGuard) {}

 

  goToMenu() {
    this.router.navigate(['menu']);
  }

  ngOnInit() {}

  name: string;
  password: string;

  error: string;

  async login() {
    this.loading = true;
    const canLogin = await this.auth.login({
      name: this.name,
      password: this.password,
    });
    if (canLogin) {
      localStorage.setItem("token", canLogin.token)
      this.goToMenu();
    } else {
      this.error = 'Incorrect user or password';
    }
    this.loading = false;
  }

  goToRegister() {
    this.router.navigate(['registro']);
  }

}
