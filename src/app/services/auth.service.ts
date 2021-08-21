import { Injectable } from '@angular/core';
import { Login } from '../shared/interface/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(model: Login) {
console.log(model);
  }
}
