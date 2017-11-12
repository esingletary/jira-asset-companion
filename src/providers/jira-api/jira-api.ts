import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JiraApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello JiraApiProvider Provider');
  }

  authenticateUser() {
    let headers = new HttpHeaders();
    headers.append('Authorization',  'Basic aXR0ZWNoOlNuQHJreVNoQHJr');
    return this.http.get(`https://support.mvnu.edu/rest/api/latest/myself`, {headers: headers});
  }
}
