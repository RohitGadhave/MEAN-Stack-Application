import { Injectable } from '@angular/core';
import { Login } from '../interface/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { HelperService } from './helper.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public endpointversion = environment.endpointversion;
  public apiUrl = environment.api;
  public $currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private httpClient: HttpClient,
    private _storage: StorageService,
    private _helperService: HelperService) { }

  login(model: Login) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(model);
    return this.httpClient.post(this.apiUrl + this.endpointversion + 'api/auth/signin', model)
      .pipe(map((res: any) => {
        if (res.user && res.accessToken && res.refreshAccessToken) {
          this._helperService.accessToken = res.accessToken
          this._helperService.refreshAccessToken = res.refreshAccessToken
          this._helperService.currentUser = res.user
          this.$currentUserSubject.next(res);
          this._storage.setData('user', JSON.stringify(res.user));
          this._storage.setData('currentUser', JSON.stringify(res));
          this._storage.setData('accessToken', res.accessToken);
          this._storage.setData('refreshAccessToken', res.refreshAccessToken);
          return res;
        }

      }));
  }
  public get currentUserValue(): any {
    return this.$currentUserSubject.value;
  }
  setCurrentUserValue() {
    const u = this._storage.getDate('currentUser');
    console.table(u)
    this.$currentUserSubject.next(u);
  }
  apiGet(model): Observable<any> {
    let params = {}
    return this.httpClient.get(this.apiUrl + this.endpointversion);
  }
  apiPost(): Observable<any> {
    let params = {};
    return this.httpClient.post(this.apiUrl + this.endpointversion, params);
  }
  api(endpoint: string, model: any = {}, method = 'get') {

    switch (method) {
      case 'get':

        break;
      case 'post':

        break;

      default:
        break;
    }

  }
  refreshToken(refreshAccessToken :string):Observable<any> {
    //let refreshAccessToken = this._helperService.refreshAccessToken;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.apiUrl + this.endpointversion + 'api/auth/refresh-token', { refreshAccessToken });
  }
}
