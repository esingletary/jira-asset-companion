import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JiraApiProvider } from '../../providers/jira-api/jira-api';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  name : string;

  constructor(public navCtrl: NavController, jiraAPI: JiraApiProvider) {
    jiraAPI.authenticateUser().subscribe(
      data => {
      console.log(data);
      this.name = data['displayName'];
    }, err => {
      console.log(err);
      this.name = err.status;
    });
  }

}
