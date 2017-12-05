import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthProvider } from '../auth/auth';

import { Issue } from '../../models/issue'

@Injectable()
export class JiraProvider {

  apiVersion: string = '2'; // The API version we want to use
  jiraInstanceUrl: string = 'https://support.mvnu.edu' // The Jira instance URL
  urlString: string = `${this.jiraInstanceUrl}/rest/api/${this.apiVersion}`; // Concat those together

  constructor(
    public http: HttpClient,
    public auth: AuthProvider
  ) {}

  // Authenticate the user against Jira's profile endpoint.
  public authenticateUser(username: string, password: string): Observable<Object> {
    return this.http.get(`${this.urlString}/myself`, {headers: new HttpHeaders()
    .set('Authorization', `Basic ${btoa(username+':'+password)}`)});
  }

  // Get issue details based on the provided key.
  public getIssue(key: string): Observable<Issue> {
    return this.http.get<Issue>(`${this.urlString}/issue/${key}`, {headers: new HttpHeaders()
      .set('Authorization', `Basic ${this.auth.getAuthString()}`)});
  }
}
