import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoggedinGuard } from 'src/app/guards/loggedin.guard';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs'
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
     ron: string;
     texto: string;
     interval; 
     tim=0.25; 
     
  ;
    
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
  
      const rondas =localStorage.getItem("partidas1");
      const canLogin = await this.auth.preguntas();
      this.ron= rondas +"/10";
      this.category= canLogin.category;
      this.pregunta= canLogin.question;
      this.RespuestaC=canLogin.correct_answer;
      this.respuestasf=canLogin.incorrect_answers;
  
  this.respuestasf0= this.respuestasf[0];
  this.respuestasf1= this.respuestasf[1];
  this.respuestasf2= this.respuestasf[2];
  this.ron= 'Ronda' + rondas
  
    }
  play(boolean){
  
  
  const rondas =localStorage.getItem("partidas1");
   const pu =localStorage.getItem("puntuacion1");
  localStorage.setItem("partidas1", String(0) );
  localStorage.setItem("puntuacion1", String(0) );
  localStorage.setItem("puntos1", String(0) );
  this.ron= 'Ronda' + rondas
    
      
  
     if(this.loading1==true){
     
      const parti= parseInt(rondas)+1;
      console.log(parti)
      localStorage.setItem("partidas1", String(parti) );
  
      const pts =localStorage.getItem("puntos1");
      const p= parseInt(pu)+10;
      const pun= parseInt(pts) + p;
      
     localStorage.setItem("puntos1", String(pun) );
      console.log(p)
      localStorage.setItem("puntuacion1", String(p) );
  
     this.goToRush();
    
     }else{
      window.location.assign('/menu');
      localStorage.removeItem("partidas1" );
      localStorage.removeItem("puntuacion1" );
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
  
    if(this.timer<=0){
      alert('Tiempo agotado')
      window.location.assign('/menu');
    localStorage.removeItem("partidas1" );}
  
  }
  
  
  
  goToRush() {
    window.location.assign('/rush');
  }
  
  async putt() {
    this.loading = true;
    const obtenido = await this.auth.obtener({
      recordscore: localStorage.getItem("puntos1"),
      modo: "rush",
    });
    if (obtenido) {
      window.location.assign('/menu');
    } 
    this.loading = false;
  }
  
  }
  