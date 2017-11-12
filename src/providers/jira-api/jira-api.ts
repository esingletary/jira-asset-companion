import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JiraApiProvider {

  constructor(public http: HttpClient) {
  }

  authenticateUser(username, password) {
    return this.http.get(`https://support.mvnu.edu/rest/api/2/myself`, {headers: new HttpHeaders()
    .set('Authorization', `Basic ${btoa(username+':'+password)}`)});
  }
}
