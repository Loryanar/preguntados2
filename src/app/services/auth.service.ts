import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from './request.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(private request: RequestService){
     
 }




  async login(params){
    try {
      await this.request.send(params, '/log');
     
      return true;
    } catch {
      return false;
    }
  }
  async preguntas(){
    try{
await this.request.getP();
console.log(this.request.getP())
return await this.request.getP();
;

    }catch{
return false;
    }
  }

  async register(params) {
    try {
      console.log(params);
      await this.request.send(params, '/registro');
      
      return true;
    } catch {
      return false;
    }
  }

  async obtener(params) {
    try {
      console.log(params);
      await this.request.put(params, '/score');
      
      return true;
    } catch {
      return false;
    }
  }
}