import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { AuthProvider } from '../../providers/auth/auth';

import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  private user : User;
  data : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private barcodeScanner: BarcodeScanner) {

      this.user = navParams.data;
  }

  ionViewDidLoad() {
  }

  public onLogoutSubmit() : void {
    this.auth.destroyAuth();
    this.navCtrl.popToRoot();
  }

  public activateScanner() : void {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.data = this.parseUrl(barcodeData.text);
    }, (err) => {
         this.data = err;
    });
  }

  public parseUrl(url : string) : string {
    let urlArray = url.split('/');
    let prefix = urlArray[urlArray.length -1].substring(0, 4);
    console.log(prefix);
    if (prefix != 'ITAM' || prefix == null) {
      return 'Not a Jira QR Code';
    } else {
      return urlArray[urlArray.length -1];
    }
  }
}
