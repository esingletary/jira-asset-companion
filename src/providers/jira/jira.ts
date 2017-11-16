import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthProvider } from '../auth/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JiraProvider {

  URLString = 'https://support.mvnu.edu/rest/api/2';

  constructor(public http: HttpClient, public auth: AuthProvider) {
  }

  public authenticateUser(username: string, password: string): Observable<Object> {
    return this.http.get(`${this.URLString}/myself`, {headers: new HttpHeaders()
    .set('Authorization', `Basic ${btoa(username+':'+password)}`)});
  }

  public getListOfProjects(): Observable<Object> {
    return this.http.get(`${this.URLString}/project`, {headers: new HttpHeaders()
      .set('Authorization', `Basic ${this.auth.getAuthString()}`)});
  }

  public getIssue(key: string): Observable<Object> {
    return this.http.get(`${this.URLString}/issue/${key}`, {headers: new HttpHeaders()
      .set('Authorization', `Basic ${this.auth.getAuthString()}`)});
  }
}
