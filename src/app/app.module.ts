import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HomePageModule} from "../pages/home/home.module";


import {AndroidPermissions} from '@ionic-native/android-permissions';
import {Geolocation} from "@ionic-native/geolocation";
import { LocationserveProvider } from '../providers/locationserve/locationserve';
import {Diagnostic} from "@ionic-native/diagnostic";
import {LocationAccuracy} from "@ionic-native/location-accuracy";
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomePageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    AndroidPermissions,
    Geolocation,
    Diagnostic,
    LocationAccuracy,
    BackgroundGeolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationserveProvider
  ]
})
export class AppModule {
}
