import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { JiraApiProvider } from '../../providers/jira-api/jira-api';
import { AuthProvider } from '../../providers/auth/auth';

import { SearchPage } from '../search/search';

import { User } from '../../models/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private form : FormGroup;
  user : User;
  errors : string;

  constructor(
    public navCtrl: NavController,
    private jiraAPI: JiraApiProvider,
    private formBuilder: FormBuilder,
    private auth : AuthProvider
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onLoginSubmit() : void {
    if (this.form.valid) {
      this.jiraAPI.authenticateUser(this.form.get('username').value, this.form.get('password').value).subscribe(
        data => {
          this.errors = null;
          this.user = {
            name: data['name'],
            email: data['emailAddress'],
            avatarURL: data["avatarUrls"]["48x48"],
            displayName: data['displayName']
          }
          this.auth.storeCredentials(this.form.get('username'), this.form.get('password'));
          this.moveToMainPage(this.user);
      }, err => {
        this.errors = 'Invalid username or password';
      });
    } else {
      this.errors = 'Please enter a username and password';
    }
  }

  public moveToMainPage(user) : void {
    this.navCtrl.push(SearchPage, user);
  }
}
