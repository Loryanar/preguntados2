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

    const rondas =localStorage.getItem("partidas");
    const canLogin = await this.auth.preguntas();
    this.ron= rondas +"/10";
    this.category= canLogin.category;
    this.pregunta= canLogin.question;
    this.RespuestaC=canLogin.correct_answer;
    this.respuestasf=canLogin.incorrect_answers;

this.respuestasf0= this.respuestasf[0];
this.respuestasf1= this.respuestasf[1];
this.respuestasf2= this.respuestasf[2];
    

  }
play(boolean){


const rondas =localStorage.getItem("partidas");
 const pu =localStorage.getItem("puntuacion");
localStorage.setItem("partidas", String(0) );
localStorage.setItem("puntuacion", String(0) );

this.ron= rondas +"/10";
  
    if(parseInt(rondas)<=9){
    
   if(this.loading1==true){
   
    if(parseInt(rondas)==10){
      this.router.navigate(['menu']);
      this.putt();
    }
   
    const parti= parseInt(rondas)+1;
    console.log(parti)
    localStorage.setItem("partidas", String(parti) );

    const pts =localStorage.getItem("puntos");
    const p= parseInt(pu)+10;
    const pun=  p;
    
   localStorage.setItem("puntos", String(pun) );
   
    localStorage.setItem("puntuacion", String(p) );

   this.goToNormal();
   this.router.navigate(['/normal']);
  
    
   }else{
    this.router.navigate(['menu']);
    localStorage.removeItem("partidas" );
    localStorage.removeItem("puntuacion" );
    this.putt();
    localStorage.setItem("puntos", String(0) );
    
   }


  }else{
    this.router.navigate(['menu']);
    
    this.putt();
    localStorage.setItem("puntos", String(0) );
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
  localStorage.removeItem("partidas" );}

}



goToNormal() {
  this.router.navigate(['normal']);
}

async putt() {
  this.loading = true;
  const obtenido = await this.auth.obtener({
    recordscore: localStorage.getItem("puntos"),
    modo: "normal",
  });
  if (obtenido) {
    this.router.navigate(['menu']);
  } 
  this.loading = false;
}

}
