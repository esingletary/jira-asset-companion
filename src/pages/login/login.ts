import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular'
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

  constructor(public navCtrl: NavController, private jiraAPI: JiraApiProvider, private formBuilder: FormBuilder, private auth : AuthProvider, public loadingCtrl: LoadingController
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: ['false']
    });
    localStorage.clear();
  }

  public onLoginSubmit() : void {
    if (this.form.valid) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.jiraAPI.authenticateUser(this.form.get('username').value, this.form.get('password').value).subscribe(
        data => {
          this.errors = null;
          this.user = {
            name: data['name'],
            email: data['emailAddress'],
            avatarURL: data["avatarUrls"]["48x48"],
            displayName: data['displayName']
          }
          loading.dismiss();
          if (!this.auth.isAuthenticated() && this.form.get('remember').value === true) {
            this.auth.storeCredentials(this.form.get('username').value, this.form.get('password').value);
          }
          this.auth.setAuthString(this.form.get('username').value, this.form.get('password').value);
          this.form.reset();
          this.moveToMainPage(this.user);
      }, err => {
        this.errors = 'Invalid username or password';
      });
    } else {
      this.errors = 'Please enter a username and password';
    }
  }

  public moveToMainPage(user) : void {
    this.navCtrl.setRoot(SearchPage, user, {animate: true, direction: 'forward'});
  }
}
