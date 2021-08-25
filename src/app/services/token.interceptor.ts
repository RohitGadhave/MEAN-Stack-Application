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
import { switchMap } from 'rxjs/operators';
import { StorageService } from '.';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _storage: StorageService, private _helperService: HelperService, private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf('/refresh-token') > -1) {
      console.log('/refresh-token');
      return next.handle(request);
    }
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
      //if token expired then refresh the token and resend the previous request
      if (isExpired) {
        console.log("Expired");
        return this.authService.refreshToken(refreshAccessToken).pipe(
          switchMap((res: any) => {
            this._helperService.accessToken = res.accessToken
            this._storage.setData('accessToken', res.accessToken);
            console.log("refreshToken Expired");
            return next.handle(request.clone({ setHeaders: { "Authorization": `Bearer ${res.accessToken}` } }));
          })
        )
      }
      else {
        console.log("accessToken");
        return next.handle(request.clone({ setHeaders: { "Authorization": `Bearer ${accessToken}` } }));
      }
    } else {
      if (user) console.warn('user');
      if (accessToken) console.warn('accessToken');
      if (refreshAccessToken) console.warn('refreshAccessToken');
      console.log("unotherized");
      return next.handle(request);

    }

    //console.log(JSON.stringify(request));
    //
  }
}
