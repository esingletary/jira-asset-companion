import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {

  private authString : string;

  constructor(public http: HttpClient, private storage: Storage) {
  }

  public storeCredentials(username : string, password : string) : void {
    let credentials = btoa(username +':'+ password);
    this.storage.set('authString', credentials);
  }

  public isAuthenticated() : boolean {
    return this.authString != null;
  }

  public getAuthString() : string {
    return this.authString;
  }

  public setAuthString(username: string, password: string) : void {
    this.authString = btoa(username +':'+ password);
  }

  public loadAuthString() : Promise<void> {
    return new Promise((resolve) => {
      this.storage.get('authString')
      .then((val) => {
        this.authString = val;
        resolve();
      })
    })
  }

  public destroyAuth() : void {
    localStorage.clear();
    this.storage.clear();
    this.authString = null;
  }

}
