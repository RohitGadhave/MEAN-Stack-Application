import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtHelperService } from "@auth0/angular-jwt";
import { HelperService } from './helper.service';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _helperService: HelperService, private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this._helperService.accessToken;
    const refreshAccessToken = this._helperService.refreshAccessToken;
    const user = this._helperService.currentUser;
    //console.table(user)
    if (user && accessToken && refreshAccessToken) {
      const JWThelper = new JwtHelperService();
      
      //const decodedToken = JWThelper.decodeToken(accessToken);
      //const expirationDate = JWThelper.getTokenExpirationDate(accessToken);
      const isExpired = JWThelper.isTokenExpired(accessToken);
      console.warn(isExpired);
      //if token expired then refresh the token
      if (isExpired) {
        console.log(JSON.stringify(request));
        //this.authService.refreshToken().subscribe(res=>{},err=>{console.warn(err)});
      }
      else{
        return next.handle(request.clone({setHeaders:{"Authorization":`Bearer ${accessToken}`}}));
      }
    }

    //console.log(JSON.stringify(request));
    return next.handle(request);
  }
}
