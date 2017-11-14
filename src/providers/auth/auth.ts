import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {

  authString : string;

  constructor(public http: HttpClient, private storage: Storage) {
  }

  public storeCredentials(username, password) : void {
    this.authString = btoa(username +':::'+ password);
    this.storage.set('authString', this.authString);
  }

  public cacheCredentials(username, password) {
    this.authString = btoa(username +':::'+ password);
    localStorage.setItem('authString', this.authString);
  }

  public isAuthenticated() {
    return this.authString != null;
  }

  public getAuthString() {
    return this.authString;
  }

  public loadAuthString() {
    return new Promise((resolve, reject) => {
      this.storage.get('authString')
      .then((val) => {
        this.authString = val;
        resolve('loaded!')
      })
    })
  }

  public destroyAuth() {
    localStorage.clear();
    this.storage.clear();
    this.authString = null;
  }

}
