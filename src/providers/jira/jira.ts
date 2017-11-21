import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthProvider } from '../auth/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JiraProvider {

  apiVersion = '2';
  jiraInstanceUrl = 'https://support.mvnu.edu'
  urlString = `${this.jiraInstanceUrl}/rest/api/${this.apiVersion}`;

  constructor(public http: HttpClient, public auth: AuthProvider) {}

  public authenticateUser(username: string, password: string): Observable<Object> {
    return this.http.get(`${this.urlString}/myself`, {headers: new HttpHeaders()
    .set('Authorization', `Basic ${btoa(username+':'+password)}`)});
  }

  public getListOfProjects(): Observable<Object> {
    return this.http.get(`${this.urlString}/project`, {headers: new HttpHeaders()
      .set('Authorization', `Basic ${this.auth.getAuthString()}`)});
  }

  public getIssue(key: string): Observable<Object> {
    return this.http.get(`${this.urlString}/issue/${key}`, {headers: new HttpHeaders()
      .set('Authorization', `Basic ${this.auth.getAuthString()}`)});
  }
}
