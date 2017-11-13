import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { User } from '../../models/user';

import { JiraApiProvider } from '../../providers/jira-api/jira-api';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  private user : User;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private jiraAPI: JiraApiProvider, private statusBar: StatusBar) {
    this.user = navParams.data;
    statusBar.styleDefault();
  }

  ionViewDidLoad() {
  }

}
