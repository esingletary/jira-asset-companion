import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JiraApiProvider {

  URLString = 'https://support.mvnu.edu/rest/api/2';

  constructor(public http: HttpClient) {
  }

  public authenticateUser(username, password) {
    return this.http.get(`${this.URLString}/myself`, {headers: new HttpHeaders()
    .set('Authorization', `Basic ${btoa(username+':'+password)}`)});
  }

  public getListOfProjects(username, password) {
    return this.http.get(`${this.URLString}/project`, {headers: new HttpHeaders()
      .set('Authorization', `Basic ${btoa(username+':'+password)}`)});
  }
}
