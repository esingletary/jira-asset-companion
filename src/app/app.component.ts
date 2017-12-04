import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
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
  @ViewChild('myNav') nav: NavController
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, headerColor: HeaderColor, private auth: AuthProvider, private menu: MenuController) {
    auth.loadFromStorage().then(() => {
      if (auth.isAuthenticated()) {
        this.rootPage = SearchPage;
        menu.enable(true, 'profile-menu');
      } else {
        this.rootPage = LoginPage;
        menu.enable(false, 'profile-menu');
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

  public onLogoutSubmit(): void {
    this.menu.enable(false, 'profile-menu');
    this.auth.destroyAuth();
    this.nav.setRoot(LoginPage,{},{animate: true, direction: 'back'});
  }
}

