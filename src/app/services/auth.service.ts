import { Injectable } from '@angular/core';
import { Login } from '../shared/interface/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public endpointversion = environment.endpointversion;
  public apiUrl = environment.api;
  constructor(private httpClient: HttpClient) { }

  login(model: Login) {
    let headers= new HttpHeaders({
      'Content-Type':'application/json'
    });
    console.log(model);
    return this.httpClient.post(this.apiUrl + this.endpointversion+'api/auth/signin', model,{ headers });
  }
  apiGet(model): Observable<any> {
    let params = {}
    return this.httpClient.get(this.apiUrl + this.endpointversion);
  }
  apiPost(): Observable<any> {
    let params = {};
    return this.httpClient.post(this.apiUrl + this.endpointversion, params);
  }
  api(endpoint: string,model:any={}, method = 'get') {

    switch (method) {
      case 'get':

        break;
      case 'post':

        break;

      default:
        break;
    }

  }
}
