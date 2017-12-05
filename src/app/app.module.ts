import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HeaderColor } from '@ionic-native/header-color';
import { Dialogs } from '@ionic-native/dialogs'

import { App } from './app.component';

// Pages and their modules
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { SearchPageModule } from '../pages/search/search.module';
import { AssetPage } from '../pages/asset/asset';
import { AssetPageModule } from '../pages/asset/asset.module';

// Providers
import { JiraProvider } from '../providers/jira/jira';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    App,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    SearchPageModule,
    AssetPageModule,
    IonicModule.forRoot(App),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    LoginPage,
    SearchPage,
    AssetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    HeaderColor,
    Dialogs,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JiraProvider,
    AuthProvider
  ]
})
export class AppModule {}
