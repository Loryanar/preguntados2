import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoggedinGuard } from 'src/app/guards/loggedin.guard';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs'
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-bodyr',
  templateUrl: './bodyr.component.html',
  styleUrls: ['./bodyr.component.scss'],
})

export class BodyrComponent implements OnInit {

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
  rondas: number;
  ron: string;
  texto: string;
  interval; 
  tim=0.25; 
     

    
  constructor( private auth: AuthService, private tok: LoggedinGuard,private router: Router) { 
      
  }
  
  ngOnInit(){
    localStorage.setItem("time", String(0.5))
    this.preguntas();
    const temi= localStorage.getItem("time")
    if(this.tim==0.25){
      const timm= parseInt(temi)+0.14+0.33
      this.startTimer(timm)
      localStorage.setItem("time", String(timm))
      return timm
    }
  }
  
  async preguntas() {

    let x = localStorage.getItem("rondas")
    if (x == "NaN") {

      localStorage.setItem("rondas", String(1))
      this.ron = localStorage.getItem("rondas")
      console.log(this.ron);
      
    } else {

      localStorage.setItem("rondas", String(Number(x)+1))
      this.ron = localStorage.getItem("rondas")
      console.log(this.ron);
      
    }
    const canLogin = await this.auth.preguntas();
    this.category= canLogin.category;
    this.pregunta= canLogin.question;
    this.RespuestaC=canLogin.correct_answer;
    this.respuestasf=canLogin.incorrect_answers;
    this.respuestasf0= this.respuestasf[0];
    this.respuestasf1= this.respuestasf[1];
    this.respuestasf2= this.respuestasf[2];
  
  }
  
  play(boolean){
    
      
    if(this.loading1){

      let x = localStorage.getItem("puntos")
      
      if (x=="NaN") {

        localStorage.setItem("puntos", String(1) );
        
      } else {
        localStorage.setItem("puntos", String(Number(x)+1) );
      }
      window.location.assign('rush');

    }else{

      localStorage.removeItem("rondas")
      this.puntuacion = Number(localStorage.getItem("puntos"))
      localStorage.removeItem("puntos")
      this.putt(this.puntuacion);
    
    }
  
  
  
  
  }
  correcta(){  
    this.loading1 =true;
     this.play(this.loading1);
  
   
  }
  
  incorrecta(){
    this.loading1 =false;
    this.play(this.loading1);
  
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
    localStorage.removeItem("partidas1" );}
  
  }
  
  
  
  goToRush() {
    window.location.assign('rush');
  }
  
  async putt(puntos: Number) {
    this.loading = true;
    const obtenido = await this.auth.obtener({
      recordscore: puntos,
      modo: "rush",
    });
    if (obtenido) {
      this.preguntas();
      this.router.navigate(['menu']);
    } 
    this.loading = false;
  }
  
  }