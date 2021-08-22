import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setData(key: string, value: any) {
    localStorage.setItem(key, value)
  }
  getDate(key: string) {
    return localStorage.getItem(key);
  }
  removeData(key: string) {
    localStorage.removeItem(key);
  }
  remove(){

  }
}
