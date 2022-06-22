import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
scorer;
scoren;
  constructor(
    private router: Router,
    private auth: AuthService,
    ) { }

  goToNormal() {
    this.router.navigate(['normal']);
  }
  goToRush() {
    this.router.navigate(['rush']);
    
  }
  goToHome(){
    this.router.navigate(['home']);
  }
  async cerrarS() {
    const bandera = await this.auth.cerrar()
    if (bandera) {
      console.log("cerrando...");
      localStorage.removeItem("token")
      this.goToHome();
    } else {
      console.log("no se ha podido cerrar la sesion");
      
    }
  }

  async datosusuario(){

    const data = await this.auth.datos();

    this.scoren = data.scorenormal;
    this.scorer = data.scorerush;
    
    
  }
  ngOnInit() {
    this.datosusuario();
  }

}
