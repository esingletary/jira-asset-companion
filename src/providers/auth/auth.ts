import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {

  authString : string;

  constructor(public http: HttpClient, private storage: Storage) {
  }

  public storeCredentials(username, password) : void {
    this.authString = btoa(username+':'+ password);
    this.storage.set('authString', this.authString);
  }

  public isAuthenticated() {
    console.log(this.authString);
    return this.authString != null;
  }

  loadAuthString() {
    return new Promise((resolve, reject) => {
      this.storage.get('authString')
      .then((val) => {
        this.authString = val;
        resolve('loaded!')
      })
    })
  }

  public destroyAuth() {
    this.storage.set('authString', null);
    this.authString = null;
  }

}
