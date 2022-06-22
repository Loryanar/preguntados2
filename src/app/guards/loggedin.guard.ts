import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {
token: string;
  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('token')){
      console.log(localStorage.getItem('token'));
    return true;
    }else{
      this.router.navigate(['/login']);
    }
  }
  getToken(){
    if(localStorage.getItem('token')!= ""){
         this.token= localStorage.getItem('token');
         console.log(this.token);
    return this.token;
    }
 
  }
  
}
