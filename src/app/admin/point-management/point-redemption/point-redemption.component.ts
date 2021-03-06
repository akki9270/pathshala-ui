import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { UserService } from 'src/app/services/user.service';
import { Platform } from '@ionic/angular';
import { QrScannerComponent } from 'angular2-qrscanner';
import { RewardDetailsService } from 'src/app/folder/student-details/reward-details/reward-details.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-point-redemption',
  templateUrl: './point-redemption.component.html',
  styleUrls: ['./point-redemption.component.scss'],
})
export class PointRedemptionComponent implements OnInit {

  isScannig = true;
  studentData: any = {};
  studentObj = [];
  loginUser;
  data = {
    user_id: null
  }
  added_by;
  @ViewChild('qrScanner', { static: false }) qrScannerComponent: QrScannerComponent;

  constructor(
    private _location: Location,
    public barcodeScanner: BarcodeScanner,
    private userService: UserService,
    public platform: Platform,
    private rewardDetailsService: RewardDetailsService,
    public sharedService: SharedService
  ) { }

  ngOnInit() {
    this.initPage();
    this.sharedService.getTeacher.subscribe((data: any) => {
      this.added_by = data.id
    });
  }

  fetchBookedReward(id) {
    this.rewardDetailsService.fetchBookedReward(id)
      .subscribe(res => {
        this.studentObj = res['data'];
      });
  }

  onRedeem(id, user_id, point) {
    this.rewardDetailsService.onRedeem(id)
      .subscribe(res => {
        this.removePoint(user_id, point)
        this.fetchBookedReward(this.loginUser.id)
      });
  }

  removePoint(user_id, point) {
    let obj = {
      description: 'redeem Reward ',
      isPointAdded: 0,
      point: point,
      user_id: user_id,
      added_by: this.added_by
    }
    this.rewardDetailsService.removePoint(obj)
      .subscribe(res => {
      })
  }
  imageLoadError(event) {
    event.target.src = 'https://via.placeholder.com/300';
  }

  initPage() {
    setTimeout(() => {
      // this.getUserData(1001);
      if (this.platform.is('capacitor')) {
        this.barcodeScan();
      } else {
        // this.webScanner();
        // this.getUserData(3);
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
      data.text = data.text.replace('http://', '');
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

