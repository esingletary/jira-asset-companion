import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Issue } from '../../models/issue';

@IonicPage()
@Component({
  selector: 'page-asset',
  templateUrl: 'asset.html',
})
export class AssetPage {

  issue: Issue;
  issueType: string;
  issueDetails: string;
  lozengeColor: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.issue = navParams.get('issueDetails');
    console.log(this.issue);
    this.issueType = this.issue.fields.issuetype.name;
    this.issueDetails = 'basics';
    this.lozengeColor = this.getLozengeColor(this.issue.fields.status.name.toLowerCase())
  }

  ionViewDidLoad() {}

  public getLozengeColor(status: string) {
    if (status == 'deployed') {
      return 'jira-green'
    } else {
      return 'jira-yellow'
    }
  }

  public parseDate(dateString: string): string {
    let date = new Date(dateString);
    return date.toDateString();
  }
}
