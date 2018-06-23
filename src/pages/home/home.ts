import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {LocationserveProvider} from "../../providers/locationserve/locationserve";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  data: any = "STARTED HOME PAGE";

  constructor(public navCtrl: NavController, public navParams: NavParams, private locationServe: LocationserveProvider, private platform: Platform) {
  }


  ionViewDidLoad() {

  }

  async requestPermisson() {
    this.platform.ready().then(async (readySource) => {
      await this.locationServe.getPermission();
    }).catch(err => {
      alert("Platform Error :" + JSON.stringify(err));
    });
  }

  async startForegroundTime() {
    this.platform.ready().then(async (readySource) => {
      this.data = await this.locationServe.startForegroundTimeout();
    }).catch(err => {
      alert("Platform Error :" + JSON.stringify(err));
    });
  }


  async startForegroundNoTime() {
    this.platform.ready().then(async (readySource) => {
       await this.locationServe.getLocationAccuracy();

       this.data = await this.locationServe.startForegroundNoTimeout();

    }).catch(err => {
      alert("Platform Error :" + JSON.stringify(err));
    });
  }

  async startBackground() {
    this.platform.ready().then(async (readySource) => {
      this.data = await this.locationServe.startBackGroundLocationTracking();
    }).catch(err => {
      alert("Platform Error :" + JSON.stringify(err));
    });
  }

  async startBackgroundForeground() {
    this.platform.ready().then(async (readySource) => {
      this.data = await this.locationServe.startBackGroundLocationTrackingForeground();
    }).catch(err => {
      alert("Platform Error :" + JSON.stringify(err));
    });
  }

  async stopBackground() {
    this.platform.ready().then(async (readySource) => {
      await this.locationServe.stopBackGroundLocationTracking();
    }).catch(err => {
      alert("Platform Error :" + JSON.stringify(err));
    });
  }

}
