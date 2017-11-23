import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';

import { AuthProvider } from '../providers/auth/auth';

import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
@Component({
  templateUrl: 'app.html'
})
export class App {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, headerColor: HeaderColor, auth: AuthProvider) {
    auth.loadFromStorage().then(() => {
      if (auth.isAuthenticated()) {
        this.rootPage = SearchPage;
      } else {
        this.rootPage = LoginPage;
      }
      setTimeout(() => splashScreen.hide(), 500);
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      headerColor.tint('#0052cc');
    });
  }
}

