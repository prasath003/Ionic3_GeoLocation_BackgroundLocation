import {HttpClient} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {AndroidPermissions} from '@ionic-native/android-permissions';
import {Geolocation, Geoposition} from "@ionic-native/geolocation";
import {Diagnostic} from "@ionic-native/diagnostic";
import {LocationAccuracy} from "@ionic-native/location-accuracy";
import {AlertController} from "ionic-angular";
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import 'rxjs/add/operator/filter';

@Injectable()
export class LocationserveProvider {

  currentLat: any;
  currentLng: any;
  watch: any;

  constructor(public http: HttpClient, public permission: AndroidPermissions, private geoLocation: Geolocation, private backgroundGeolocation: BackgroundGeolocation,
              private diagnostic: Diagnostic, private locationAccuracy: LocationAccuracy, private alertCntrl: AlertController, private zone: NgZone) {
  }

  //location accuracy for android accept/reject

  //run this before fetching in actual device/ reopen app and run after accepting

  getLocationAccuracy() {
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {

            }, error => {
              if (error.code != null) {
                let alert = this.alertCntrl.create({
                  title: "Failed to automatically get location",
                  subTitle: 'Would you like to switch to the Location Settings page and do this manually?',
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {

                      }
                    },
                    {
                      text: 'Ok',
                      handler: () => {
                        this.diagnostic.switchToLocationSettings();
                      }
                    }
                  ]
                });
                alert.present();
              }
            }
          );
        }
      }).catch(err => {
        alert("Location Accuracy PRORITY :" + JSON.stringify(err));
      });
  }

  getPermission() {
    this.permission.requestPermissions([this.permission.PERMISSION.ACCESS_COARSE_LOCATION, this.permission.PERMISSION.ACCESS_FINE_LOCATION]);
  }

  startForegroundTimeout() {
    return new Promise(resolve => {
      // Foreground Tracking
      let options = {
        timeout: 5000,
        //maximumAge: 0,
        //frequency: 3000
        enableHighAccuracy: true
      };

      this.geoLocation.getCurrentPosition(options).then((resp) => {
        resolve("FG : TIMEOUT" + ":" + resp.coords.latitude + "," + resp.coords.longitude);
      }).catch((error) => {
        resolve("Failed location : " + JSON.stringify(error));
      });

      /*let watch = this.geolocation.watchPosition();
                watch.subscribe((resp) => {
                  this.data = "watch" + "," + resp.coords.latitude + "," + resp.coords.longitude;
                  alert(this.data);
                });*/
    }).catch(err => {
      alert(JSON.stringify(err));
    });
  }

  startForegroundNoTimeout() {
    return new Promise(resolve => {
      // Foreground Tracking
      let options = {
        frequency: 3000,
        enableHighAccuracy: true
      };

      this.geoLocation.getCurrentPosition(options).then((resp) => {
        resolve("FG : NO TIMEOUT" + ":" + resp.coords.latitude + "," + resp.coords.longitude);
      }).catch((error) => {
        resolve("Failed location : " + JSON.stringify(error));
      });
    }).catch(err => {
      alert(JSON.stringify(err));
    });
  }

  startBackGroundLocationTracking() {
    return new Promise(resolve => {

      // Background Tracking
      let config = {
        desiredAccuracy: 0,
        stationaryRadius: 20,
        distanceFilter: 10,
        debug: true,
        interval: 2000
      };

      this.backgroundGeolocation.configure(config).subscribe((location) => {
        //alert('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
        // Run update inside of Angular's zone
        /*this.zone.run(() => {
          this.currentLat = location.latitude;
          this.currentLng = location.longitude;
        });*/
        resolve("BG -  BACKGROUND :" + location.latitude + "," + location.longitude);
      }, (err) => {
        alert(err);
      });

      // Turn ON the background-geolocation system.
      this.backgroundGeolocation.start();
    }).catch(err => {
      alert(JSON.stringify(err));
    });
  }

  startBackGroundLocationTrackingForeground() {
    return new Promise(resolve => {
      // Foreground Tracking
      let options = {
        frequency: 3000,
        enableHighAccuracy: true
      };

      this.watch = this.geoLocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

        //alert(position);

        // Run update inside of Angular's zone
        /*this.zone.run(() => {
          this.currentLat = position.coords.latitude;
          this.currentLng = position.coords.longitude;
        });*/

        resolve("BG -  FOREGROUND :" + position.coords.latitude + "," + position.coords.longitude);
      });
    }).catch(err => {
      alert(JSON.stringify(err));
    });
  }

  stopBackGroundLocationTracking() {
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }

}
