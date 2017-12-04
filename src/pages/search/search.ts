import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { AuthProvider } from '../../providers/auth/auth';
import { JiraProvider } from '../../providers/jira/jira';

import { LoginPage } from '../login/login';

import { User } from '../../models/user';
import { Issue } from '../../models/issue';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  private form : FormGroup;
  data: any;
  user: User;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    private formBuilder: FormBuilder,
    private auth: AuthProvider,
    private jira: JiraProvider,
    private barcodeScanner: BarcodeScanner
  ) {

    this.form = this.formBuilder.group({
      assetNum: ['ITAM-', Validators.required]
    });

    this.user = this.auth.getUser();
  }

  ionViewDidLoad() {}

  public activateScanner(): void {
    this.barcodeScanner.scan().then((barcodeData) => {
      let scan = this.parseUrl(barcodeData.text);
      this.form.patchValue({'assetNum': scan})
    }, (err) => {
         this.data = err;
    });
  }

  public parseUrl(url: string): string {
    let urlArray = url.split('/');
    let prefix = urlArray[urlArray.length -1].substring(0, 4);
    console.log(prefix);
    if (prefix != 'ITAM' || prefix == null) {
      return 'NaN';
    } else {
      return urlArray[urlArray.length -1];
    }
  }


}
