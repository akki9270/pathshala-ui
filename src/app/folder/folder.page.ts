import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { IonContent, Platform } from '@ionic/angular';
import { QrScannerComponent } from 'angular2-qrscanner';
import { UserService } from '../services/user.service';
import * as moment from 'moment';
import { SutraService } from '../services/sutra.service';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public title: string;
  studentData: any = {};
  teacherData: any = {};
  html5QrcodeScanner: any;
  isScannig = true;
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;
  attendence = [];
  selectedSutra: any;
  currentGathaCount: any;
  // imageUrlPrefix = "http://hiteshvidhikar.com/pathshala/images/";
  // imageUrlSuffix = ".jpg";
  @ViewChild('qrScanner', { static: false }) qrScannerComponent: QrScannerComponent;
  @ViewChild(IonContent, { static: true }) ionContent;
  userGathaDetails:any;
  allSutra: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private qrScanner: QRScanner,
    private userService: UserService,
    private sutraSerice: SutraService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    public platform: Platform
    ) { }

  ngOnInit() {
    // this.title = this.activatedRoute.snapshot.paramMap.get('id');
    // this.getUserData(3);
    this.getAttendenceArray();
    setTimeout(() => {
      if (this.platform.is('capacitor')) {
        this.startCamera();
      } else {
       this.webScanner();
      //  this.getUserData(1001);
      //  this.getUserData(3);
       this.getAllSutra();
      }
    //   if (this.mobileAndTabletCheck()) {
    //   } else {
    //   }
    },100);
  }


  getAllSutra() {
    this.sutraSerice.getAllSutra()
    .subscribe( res => {
      console.log(' getAll Sutra ', res);
      this.allSutra = res['data'];
    })
  }

  getGathaCount() {
    let result = [];
    if (this.selectedSutra) {
      for(let i = 1; i <= this.selectedSutra.gatha_count; i++) {
        result.push(i)
      }
    }
    return result;
  }
  getAttendenceArray() {
    let today = new Date();
    for (let i = 7; i > 0; i--) {
      let date = moment().subtract(i,'days')
      this.attendence.push({
        date: date.format('D'),
        month: date.format('MMM'),
        date_format: date.format('MMM') + '-' + date.format('D')
        // isPresent: this.getRandomInit(2)
      })
    }
  }

  get getAge() {
    if (this.studentData.date_of_birth) {
      return moment().diff(moment(this.studentData.date_of_birth), 'years');
    }
    return 'N/A'
  }

  getRandomInit(max) {
    return Math.floor(Math.random() * max);
  }

  startCamera() {
    let ele: any = this.ionContent.el.shadowRoot.getElementById('background-content');
    this.isScannig = true;
    console.log(' start camera' + this.qrScanner);
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log('Scanned something then ');
          // start scanning
          this.qrScanner.show().then(() => {
            console.log(' show qrscanner ');
            ele.style.background = 'transparent';
            this.cdRef.detectChanges();
            let scanSub = this.qrScanner.scan().subscribe((text: string) => {
              console.log('Scanned something', text);
              // this.isScannig = false;
              this.getUserData(text);

              ele.style.background = '#FFF';
              this.cdRef.detectChanges();
              this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning              
            });
          });

        } else if (status.denied) {
          // camera permission was permanently de
          this.backToHome()
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          this.backToHome();
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => {
        console.log('Error is', e);
        this.isScannig = false;
      });
  }

  webScanner() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
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

    this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);
      this.qrScannerComponent.canvasHeight = 0;
      this.qrScannerComponent.canvasWidth = 0;
      this.getUserData(result);
      // this.checkAttendence(result);
      // this.getAttendanceDetails(result);
      // this.getGathaDetails(result);
      this.isScannig = false;
      // this.checkAttendence(result);
      // this.qrScannerComponent.stopScanning();
    });
  }

  getUserData(id) {
    this.userService.getUserData({id}).subscribe(
      (response) => {
        if (response && response['data'] && response['data'].length) {

          // this.studentData = JSON.parse(response['data']).data[0];
          if (response['data'][0].role == 'Teacher') {
            this.teacherData = response['data'][0];
            this.newScan();
            return;
          } else if (this.teacherData.id ) {
            this.studentData = (response['data'])[0];
            console.log(' student Data ', this.studentData);
            this.checkAttendence(id);
            this.getAttendanceDetails(id);
            this.getGathaDetails(id);
            this.isScannig = false;
            this.cdRef.detectChanges();
          } else {
            this.router.navigate(['']);
          }
          // this.studentData['imageUrl'] = this.imageUrlPrefix + this.studentData.id + this.imageUrlSuffix;
        }
      },
      (error) => {}
    )
  }

  checkAttendence(studentId) {
    let data = {
      studentId,
      teacherId: this.teacherData.id
    }
    this.userService.checkAttendence(data).subscribe(
      res => console.log(' checkAttendence ', res),
      error => {}
    );
  }

  getAttendanceDetails(studentId) {
    this.userService.getAttendence(studentId)
      .subscribe((res: any) => {
        console.log(' attendance ', res);
        this.attendence.forEach(item => {
          let found = res.find(i => i.attendence_date == item.date_format);
          if (found) {
            item = {
              ...item,
              ...found
            }
          }
        });
        this.cdRef.detectChanges();
      }, (error) => console.error()
      )
  }

  getGathaDetails(studentId){
    this.userService.getGathaDetails(studentId)
      .subscribe(res => {
        console.log(' userGathaDetails ', res);
        this.userGathaDetails = res;
        this.cdRef.detectChanges();
      });
  }

  updateUserSutra() {
    if (this.selectedSutra && this.currentGathaCount) {
      let data = {
        sutraId: this.selectedSutra.id,
        gathaCount: this.currentGathaCount,
        studentId: this.studentData.id,
        teacherId: this.teacherData.id
      }
      this.userService.updateUserSutra(data)
        .subscribe(res => {
          this.getUserData(this.studentData.id);
        });
    }
  }

  mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    // alert(' isMobile ' + check);
    return check;
  };

  get getCurrentDayOfGatha() {
    if (this.userGathaDetails.hasOwnProperty('start_date')) {
      let days = moment().diff(moment(this.userGathaDetails.start_date),'days');
      switch(days) {
        case 0:
          return 'Presnt Day'
        case 1:
          return '1<sup>st</sup> Day';
        case 2:
          return '2<sup>nd</sup> Day';
        case 3:
          return '3<sup>rd</sup> Day'
        default:
           {
             if (!days) {
               return 'N/A';
             } else if (days > 3) {
              return `${days}<sup>th</sup> Day`
            }
          }
      }
    }
    return 'N/A'
  }

  getNextGatha() {
    this.userService.userNextGatha({
      studentId: this.studentData.id,
      teacherId: this.teacherData.id
    }).subscribe((res: any) => {
      this.userGathaDetails = res.data;
      this.cdRef.detectChanges();
    }, (error) => {
      console.log(' error ', error);
    })
  }

  newScan() {
    this.studentData = null;
    this.isScannig = true;
    if (this.platform.is('capacitor')) {
      this.startCamera();
    } else {
      setTimeout(() => {
        this.qrScannerComponent.canvasHeight = 500;
        this.qrScannerComponent.canvasWidth = 500;
        this.webScanner();
      }, 0);
    }
  }

  backToHome() {
    this.router.navigate(['folder']);
  }
}
