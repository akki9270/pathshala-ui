import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { UserService } from 'src/app/services/user.service';
import { Platform } from '@ionic/angular';
import { QrScannerComponent } from 'angular2-qrscanner';
import { RewardDetailsService } from 'src/app/folder/student-details/reward-details/reward-details.service';

@Component({
  selector: 'app-point-redemption',
  templateUrl: './point-redemption.component.html',
  styleUrls: ['./point-redemption.component.scss'],
})
export class PointRedemptionComponent implements OnInit {

  isScannig = true;
  studentData: any = {};
  studentObj;
  loginUser;
  @ViewChild('qrScanner', { static: false }) qrScannerComponent: QrScannerComponent;

  constructor(
    private _location: Location,
    public barcodeScanner: BarcodeScanner,
    private userService: UserService,
    public platform: Platform,
    private rewardDetailsService: RewardDetailsService,
  ) { }

  ngOnInit() {
    this.initPage();
  }

  fetchBookedReward(id) {
    this.rewardDetailsService.fetchBookedReward(id)
      .subscribe(res => {
        this.studentObj = res;
      });
  }

  onRedeem (id) {
    this.rewardDetailsService.onRedeem(id)
      .subscribe(res => {
        this.studentObj = res;
        this.fetchBookedReward(this.loginUser.id)
      });
  }

  initPage() {
    setTimeout(() => {
      // this.getUserData(1001);
      if (this.platform.is('capacitor')) {
        this.barcodeScan();
      } else {
        // this.webScanner();
        this.getUserData(7);
      }
      //   if (this.mobileAndTabletCheck()) {
      //   } else {
      //   }
    }, 100);
  }

  barcodeScan() {
    this.isScannig = true;
    this.barcodeScanner.scan().then(data => {
      console.log(' barcode ', data);
      if (data && data.text) {
        this.getUserData(data.text);
      } else if (data.cancelled) {

      }
      this.isScannig = false;
    }).catch(e => {
      console.log(' barcode error ', e);
      this.isScannig = false;
    })
  }

  getUserData(id) {
    // this.presentLoading();
    this.userService.getUserData({ id }).subscribe(
      (response) => {
        this.studentData = {};
        if (response && response['data'] && response['data'].length) {
          this.loginUser = response['data'][0]
          this.fetchBookedReward(this.loginUser.id);
        } else {
        }
      },
      (error) => { }
    )
  }

  webScanner() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      // console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      // alert(' devices Length ' + videoDevices.length);
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('front')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });
  }
  backClicked() {
    this._location.back();
  }


}

