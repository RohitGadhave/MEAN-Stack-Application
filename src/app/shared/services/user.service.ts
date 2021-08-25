import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public endpointversion = environment.endpointversion;
  public apiUrl = environment.api;
  constructor(private httpClient: HttpClient) { }

  getAllUser(params:any={}){
    let paramss = {}
    return this.httpClient.get(this.apiUrl + this.endpointversion + 'api/user/userslist',{params});
  }
}
