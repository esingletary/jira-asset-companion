import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { AuthProvider } from '../../providers/auth/auth';

import { LoginPage } from '../login/login';

import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  data: any;
  user: User;

  constructor(
    public navCtrl: NavController,
    private auth: AuthProvider,
    private barcodeScanner: BarcodeScanner) {

      this.user = this.auth.getUser();

  }

  ionViewDidLoad() {
  }

  public onLogoutSubmit(): void {
    this.auth.destroyAuth();
    this.navCtrl.setRoot(LoginPage,{},{animate: true, direction: 'back'});
  }

  public activateScanner(): void {
    this.barcodeScanner.scan().then((barcodeData) => {
      let scan = this.parseUrl(barcodeData.text);
      this.data = scan;
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
