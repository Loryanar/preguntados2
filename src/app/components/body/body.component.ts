import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoggedinGuard } from 'src/app/guards/loggedin.guard';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs'
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
timer:number;
  loading = false;
  loading1:boolean;
  category:string;
  pregunta:string;
  RespuestaC:string;
  respuestasf: any[];
  respuestasf1: string;
  respuestasf2: string;
   respuestasf0: string;
   puntuacion: number;
   partidas:number;
   rondas:string;
   ron: string;
   texto: string;
   interval; 
   
;
  
  constructor( private auth: AuthService, private tok: LoggedinGuard,private router: Router) { 
    
  }

  ngOnInit(){

    this.preguntas();
    this.startTimer(1)
    
  }

  async preguntas() {

    let x = localStorage.getItem("partidas");
    if(x == "NaN"){
      localStorage.setItem("partidas",String(1))
    } else {
      localStorage.setItem("partidas",String(Number(x)+1))
    }
    this.rondas = localStorage.getItem("partidas")
    const canLogin = await this.auth.preguntas();
    this.ron= this.rondas +"/10";
    this.category= canLogin.category;
    this.pregunta= canLogin.question;
    this.RespuestaC=canLogin.correct_answer;
    this.respuestasf=canLogin.incorrect_answers;
    this.respuestasf0= this.respuestasf[0];
    this.respuestasf1= this.respuestasf[1];
    this.respuestasf2= this.respuestasf[2];  
  }

  play(boolean){
  
    
      if(this.loading1==true){

        let p = localStorage.getItem("puntos")
        if (p == "NaN") {
          localStorage.setItem("puntos", String(10))
        } else {
          localStorage.setItem("puntos", String(Number(p)+10))
        }
   
        if(parseInt(this.rondas)==10){
          
          this.puntuacion = Number(localStorage.getItem("puntos"))
          localStorage.removeItem("partidas")
          localStorage.removeItem("puntos")
          console.log(this.puntuacion);  
          this.putt();
        }

    
        window.location.assign('normal');
      
      }else{
        this.puntuacion = Number(localStorage.getItem("puntos"))
        localStorage.removeItem("partidas")
        localStorage.removeItem("puntos")
        console.log(this.puntuacion); 
        this.putt();
      }
  }
  
  correcta(){  
    this.loading1 =true;
    this.play(this.loading);

 
  }

  incorrecta(){
    this.loading1 =false;
    this.play(this.loading);

  }

  startTimer(duraction:number){
    clearInterval(this.interval);
    this.timer= duraction *60;
    this.updateTimeValue()
    this.interval= setInterval(()=>{
      this.updateTimeValue();
    },1000)
  }
  updateTimeValue(){
    let minutes: any= this.timer / 60;
    let seconds: any= this.timer % 60;

    minutes = String('0'+Math.floor(minutes)).slice(-2);
    seconds = String('0'+Math.floor(seconds)).slice(-2);
    const text = minutes+ ':' +seconds;
    this.time.next(text); 
    --this.timer;

    if(this.timer==0){
      alert('Tiempo agotado')
      this.router.navigate(['menu']);
      localStorage.removeItem("partidas" );
    }
  }


  goToNormal() {
    window.location.assign('normal');
  }

  async putt() {
    this.loading = true;
    console.log(this.puntuacion);
    
    const obtenido = await this.auth.obtener({
      recordscore: this.puntuacion,
      modo: "normal",
    });
    if (obtenido) {
      this.preguntas();
      this.router.navigate(['menu']);
    } 
    this.loading = false;
  }

}