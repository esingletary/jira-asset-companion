import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthProvider } from '../auth/auth';

@Injectable()
export class JiraApiProvider {

  URLString = 'https://support.mvnu.edu/rest/api/2';

  constructor(public http: HttpClient, public auth: AuthProvider) {
  }

  public authenticateUser(username, password) {
    return this.http.get(`${this.URLString}/myself`, {headers: new HttpHeaders()
    .set('Authorization', `Basic ${btoa(username+':'+password)}`)});
  }

  public getListOfProjects() {
    return this.http.get(`${this.URLString}/project`, {headers: new HttpHeaders()
      .set('Authorization', `Basic ${this.auth.getAuthString()}`)});
  }
}
