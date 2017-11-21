import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { User } from '../../models/user';

@Injectable()
export class AuthProvider {

  private authString : string;

  private user : User;

  constructor(public http: HttpClient, private storage: Storage) {}

  public storeCredentials(username : string, password : string, user: User): void {
    let credentials = btoa(username +':'+ password);
    this.storage.set('authString', credentials);
    this.storage.set('user', JSON.stringify(user));
  }

  public isAuthenticated(): boolean {
    return this.authString != null;
  }

  public getAuthString(): string {
    return this.authString;
  }

  public setAuthString(username: string, password: string): void {
    this.authString = btoa(username +':'+ password);
  }

  public getUser() : User {
    return this.user;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public loadFromStorage(): Promise<void> {
    return new Promise((resolve) => {
      this.storage.forEach((value, key, index) => {
        if (key == 'authString') {
          this.authString = value;
        } else if (key == 'user') {
          this.user = JSON.parse(value);
        }
      }).then(() => {
        resolve();
      })
    })
  }

  public destroyAuth(): void {
    localStorage.clear();
    this.storage.clear();
    this.authString = null;
    this.user = null;
  }

}
