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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.issue = navParams.get('issueDetails');
    console.log(this.issue);
  }

  ionViewDidLoad() {}
}
