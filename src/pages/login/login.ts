import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { JiraApiProvider } from '../../providers/jira-api/jira-api';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private form : FormGroup;
  user : any;
  name : string;

  constructor(
    public navCtrl: NavController,
    private jiraAPI: JiraApiProvider,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit() {
    if (this.form.valid) {
      this.user = {
        username: this.form.get('username').value,
        password: this.form.get('password').value
      }
      this.jiraAPI.authenticateUser(this.user.username, this.user.password).subscribe(data => {
        this.name = data['displayName'];
      }, err => {
        this.name = 'Incorrect username or password';
      })
    } else {
      console.log('Form is invalid!');
    }
  }
}
