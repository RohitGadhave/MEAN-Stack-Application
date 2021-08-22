import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private accessTokenSubject$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private refreshAccessTokenSubject$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private currentUserSubject$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  constructor(private _storage: StorageService) {
    
  }

  public get accessToken() {
    let accessToken= this.accessTokenSubject$.value;
    if(!accessToken){
      //set accessToken
      console.log('accessToken set');
      this.accessToken = this._storage.getDate('accessToken');
      accessToken= this.accessTokenSubject$.value;
    }
    return accessToken;
  }

  public get refreshAccessToken() {
    let refreshAccessToken= this.refreshAccessTokenSubject$.value;
    if(!refreshAccessToken){
      //set refreshAccessToken
      console.log('refreshAccessToken set');
      this.refreshAccessToken = this._storage.getDate('refreshAccessToken');
      refreshAccessToken= this.refreshAccessTokenSubject$.value;
    }
    return refreshAccessToken;
  }

  public get currentUser() {
    //set currentUser
      console.log('currentUser set');
    let currentUser= this.currentUserSubject$.value;
    if(!currentUser){
      this.currentUser = this._storage.getDate('user');
      currentUser= this.currentUserSubject$.value;
    }
    return currentUser;
  }

  public set accessToken(accessToken: string) {
    this.accessTokenSubject$.next(accessToken);
  }
  public set refreshAccessToken(refreshAccessToken: string) {
    this.refreshAccessTokenSubject$.next(refreshAccessToken);
  }
  public set currentUser(user: string) {
    this.currentUserSubject$.next(user);
  }
}
