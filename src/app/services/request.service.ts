import { Injectable } from '@angular/core';
import config from '../../config';
import { LoggedinGuard } from 'src/app/guards/loggedin.guard';


@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor() {}

  private request(method: string, endpoint: string, body?) {
    return fetch(config.server_url + endpoint, {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    });
  }
  
  private request1(method: string ) {
    return fetch('https://opentdb.com/api.php?amount=1&type=multiple', {
      method,
   
      
    })
  }
  private request2(method: string, endpoint: string, body?) {
    console.log( localStorage.getItem("token"))
    return fetch(config.server_url + endpoint, {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem("token")
      }),
      body: JSON.stringify(body),
    });
  }
  async getP() {
    const res = await this.request1('GET');
    let data = await res.json();
    
    if (res.ok) {
      return await data.results[0];
      
    } else {
      throw new Error(await res.text());
    }
  }

  async send(params, endpoint: string, method?) {
    const res = await this.request(method || 'POST', endpoint, params);
    if (res.ok) {
      let data1 = await res.json();
      console.log(data1)
      return data1;
    } else {
      throw new Error(await res.text());
    }
  }

  async get(endpoint: string) {
    const res = await this.request('GET', endpoint);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(await res.text());
    }
  }
  async put(params, endpoint: string, method?) {
    const res = await this.request2(method || 'PUT', endpoint, params);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(await res.text());
    }
  }
}