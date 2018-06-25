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
    try {
      this.platform.ready().then(async (readySource) => {
        await this.locationServe.getPermission();
      }).catch(err => {
        alert("Platform Error :" + JSON.stringify(err));
      });
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  async startForegroundTime() {
    try {
      this.platform.ready().then(async (readySource) => {
        this.data = await this.locationServe.startForegroundTimeout();
      }).catch(err => {
        alert("Platform Error :" + JSON.stringify(err));
      });
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }


  async startForegroundNoTime() {
    try {
      this.platform.ready().then(async (readySource) => {
        await this.locationServe.getLocationAccuracy();

        this.data = await this.locationServe.startForegroundNoTimeout();

      }).catch(err => {
        alert("Platform Error :" + JSON.stringify(err));
      });
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  async startBackground() {
    try {
      this.platform.ready().then(async (readySource) => {
        this.data = await this.locationServe.startBackGroundLocationTracking();
      }).catch(err => {
        alert("Platform Error :" + JSON.stringify(err));
      });
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  async startBackgroundForeground() {
    try {
      this.platform.ready().then(async (readySource) => {
        this.data = await this.locationServe.startBackGroundLocationTrackingForeground();
      }).catch(err => {
        alert("Platform Error :" + JSON.stringify(err));
      });
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  async stopBackground() {
    try {
      this.platform.ready().then(async (readySource) => {
        await this.locationServe.stopBackGroundLocationTracking();
      }).catch(err => {
        alert("Platform Error :" + JSON.stringify(err));
      });
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }
}
