import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { JiraProvider } from '../../providers/jira/jira';
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

  constructor(public navCtrl: NavController, private jira: JiraProvider, private formBuilder: FormBuilder, private auth : AuthProvider, public loadingCtrl: LoadingController
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: ['false']
    });
  }

  public onLoginSubmit(): void {
    if (this.form.valid) {
      let loading = this.loadingCtrl.create();
      loading.present();

      let username = this.form.get('username').value;
      let password = this.form.get('password').value;

      this.jira.authenticateUser(username, password).subscribe(
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
            this.auth.storeCredentials(username, password, this.user);
          }
          this.auth.setAuthString(username, password);
          this.auth.setUser(this.user);
          this.form.reset();
          this.moveToMainPage();
      }, err => {
        if (err.status == '401') {
          this.errors = 'Invalid username or password';
        } else {
          this.errors = 'An error has occured. Try again later.';
        }
        loading.dismiss();
      });
    } else {
      this.errors = 'Please enter a username and password';
    }
  }

  public moveToMainPage(): void {
    this.navCtrl.setRoot(SearchPage, {}, {animate: true, direction: 'forward'});
  }
}
