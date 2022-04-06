import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { IonContent, LoadingController, Platform, ModalController, AlertController } from '@ionic/angular';
import { QrScannerComponent } from 'angular2-qrscanner';
import { UserService } from '../services/user.service';
import * as moment from 'moment';
import { SutraService } from '../services/sutra.service';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { SharedService } from '../services/shared.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


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
  isEditing = false;
  studentsDataArray = [
    { title: 'Id', prop: 'id' },
    { title: 'Name', prop: 'display_name' },
    { title: 'Age', prop: '', value: 'getAge' },
    { title: 'Present Days', prop: 'presentDays', value: '' },
    { title: 'Contact No', prop: 'mobile' },
    { title: 'Points', prop: 'score', value: '' },
  ]
  PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/300';
  // imageUrlPrefix = "http://hiteshvidhikar.com/pathshala/images/";
  // imageUrlSuffix = ".jpg";
  @ViewChild('qrScanner', { static: false }) qrScannerComponent: QrScannerComponent;
  @ViewChild(IonContent, { static: true }) ionContent;
  @ViewChild('idInput', { static: false }) studentIdInput: ElementRef<HTMLInputElement>;
  userGathaDetails: any;
  allSutra: any;
  totalGathaCount = [];

  attendenceFields = [
    {
      label: 'Present',
      class: 'present'
    },
    {
      label: 'Absent',
      class: 'absent'
    }
  ]
  loading: HTMLIonLoadingElement;
  isDataLoadding = true;
  scanSub;
  sutraCategory;
  selectedSutraCategory;
  terminatedSutraList = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    // private qrScanner: QRScanner,
    private userService: UserService,
    private sutraSerice: SutraService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    public platform: Platform,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public sharedService: SharedService,
    public alertController: AlertController,
    public barcodeScanner: BarcodeScanner
  ) { }

  ionViewWillEnter() {
    this.studentData = null;
    this.userGathaDetails = null;
    this.isScannig = true;
    this.attendence = [];
    // let teacherData = localStorage.getItem('teacher');
    // if(teacherData) {
    //   this.teacherData = JSON.parse(teacherData);
    // }
    this.sharedService.getTeacher.subscribe(data => {
      this.teacherData = data;
    });
    this.initPage();
  };

  ionViewWillLeave() {
    console.log(' view leave');
    this.closeScanner();
  }

  closeScanner() {
    this.isScannig = false;
    if (this.platform.is('capacitor')) {
      //
    } else {
      if (this.qrScannerComponent) {
        this.qrScannerComponent.canvasHeight = 0;
        this.qrScannerComponent.canvasWidth = 0;
      }
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp($event) {
    // console.log(' keyUp ', $event);
    if ($event.keyCode === 13) {
      let value = this.studentIdInput.nativeElement.value;
      if (value) {
        this.getUserData(value);
      }
    }
  }

  ngOnInit() {
    this.sharedService.getTeacher.subscribe(data => {
      this.teacherData = data;
    });
    // this.title = this.activatedRoute.snapshot.paramMap.get('id');
    // this.getUserData(3);
    // this.initPage();
  }

  initPage() {
    this.getAttendenceArray();
    // this.getAllSutra(1);
    this.getSutraCategory();
    setTimeout(() => {
      // this.getUserData(1001);
      if (this.platform.is('capacitor')) {
        this.barcodeScan();
      } else {
        this.webScanner();
        //  if (!this.teacherData) {
        //  this.getUserData(1001);
        //  this.getUserData(153);
        //  }
        //  this.getUserData(3);
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

  getAllSutra(id) {
    this.sutraSerice.getAllSutra({categoryId: id, studentId: this.studentData.id})
      .subscribe(res => {
        console.log(' getAll Sutra ', res);
        this.allSutra = res['data'];
      })
  }

  getSutraCategory() {
    this.sutraSerice.getAllCategory()
      .subscribe(res => {
        // console.log(' getAll Sutra ', res);
        this.sutraCategory = res['data'];
      })
  }

  onCategoryChange() {
    // console.log(' category ', this.selectedSutraCategory);
    this.getAllSutra(this.selectedSutraCategory.id);
    if (!this.terminatedSutraList.length) {
      this.getAllTerminated();
    }
  }

  getAllTerminated() {
    this.sutraSerice.getAllTerminatedSutra(this.studentData.id)
      .subscribe(res => {
        if (res && res['data']) {
          this.terminatedSutraList = res['data'];
        }
      })
  }

  getGathaCount() {
    let result = [];
    if (this.selectedSutra) {
      for (let i = 1; i <= this.selectedSutra.gatha_count; i++) {
        result.push(i)
      }
    }
    this.totalGathaCount = result;
    if (this.terminatedSutraList.length) {
      const foundTerminatedSutra = this.terminatedSutraList.find(i => i.sutra_id == this.selectedSutra.id);
      if (foundTerminatedSutra) {
        this.currentGathaCount = foundTerminatedSutra.current_gatha_count;
      }
    }
    this.cdRef.detectChanges();
    return result;
  }
  getAttendenceArray() {
    let today = new Date();
    for (let i = 6; i >= 0; i--) {
      let date = moment().subtract(i, 'days')
      this.attendence.push({
        date: date.format('D'),
        month: date.format('MMM'),
        date_format: date.format('MMM') + '-' + date.format('DD')
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

    this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);
      this.clearInput();
      this.closeScanner();
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
    this.presentLoading();
    this.userService.getUserData({ id }).subscribe(
      (response) => {
        this.studentData = {};
        this.dismisLoading();
        if (response && response['data'] && response['data'].length) {

          // this.studentData = JSON.parse(response['data']).data[0];
          if (response['data'][0].role == 'Teacher') {
            this.teacherData = response['data'][0];
            // localStorage.setItem('teacher', JSON.stringify(this.teacherData));
            this.sharedService.setTeacher(this.teacherData);
            this.newScan();
            return;
          } else {
            this.studentData = (response['data'])[0];
            this.studentData['presentDays'] = response['presentDays']
            // console.log(' student Data ', this.studentData);
            this.clearInput();
            if (this.teacherData && this.teacherData.id) {
              this.checkAttendence(id);
            }
            this.getAttendanceDetails(id);
            this.getGathaDetails(id);
            this.isScannig = false;
            this.cdRef.detectChanges();
          }
          // else {
          //   this.router.navigate(['']);
          // }
          // this.studentData['imageUrl'] = this.imageUrlPrefix + this.studentData.id + this.imageUrlSuffix;
        } else {
          this.showMessage('No user for the given id')
          this.newScan();
        }
      },
      (error) => { }
    )
  }

  checkAttendence(studentId) {
    let data = { studentId, teacherId: this.teacherData.id };

    this.userService.checkAttendence(data).subscribe(
      (res) => {
        // console.log(' checkAttendence ', res);
        // this.getUserData(studentId);
        if (res && res['data']) {
          this.studentData.score = res['data'].score;
        }
        this.getAttendanceDetails(studentId);
      },
      error => { }
    );
  }

  getAttendanceDetails(studentId) {
    this.isDataLoadding = true;
    this.attendence = [];
    this.getAttendenceArray();
    this.userService.getAttendence(studentId)
      .subscribe((res: any) => {
        // console.log(' attendance ', res);
        this.attendence = this.attendence.map(item => {
          let found = res.find(i => i.attendence_date == item.date_format);
          if (found) {
            item = {
              ...item,
              ...found
            }
            // console.log(' found Item ', item);
          }
          return item;
        });
        // console.log(' this.attendence ', this.attendence);
        // this.cdRef.detectChanges();
        this.isDataLoadding = false;
      }, (error) => console.error()
      )
  }

  getGathaDetails(studentId) {
    this.userService.getGathaDetails(studentId)
      .subscribe(res => {
        // console.log(' userGathaDetails ', res);
        this.userGathaDetails = res;
        this.cdRef.detectChanges();
      });
  }

  updateUserSutra() {
    this.presentLoading();
    if (this.selectedSutra && this.currentGathaCount) {
      let data = {
        sutraId: this.selectedSutra.id,
        gathaCount: this.currentGathaCount,
        studentId: this.studentData.id,
        teacherId: this.teacherData.id
      }
      this.userService.updateUserSutra(data)
        .subscribe(res => {
          this.dismisLoading();
          this.getUserData(this.studentData.id);
          this.selectedSutraCategory = '';
          this.selectedSutra = '';
          this.currentGathaCount = '';
        }, () => { this.dismisLoading() });
    }
  }

  mobileAndTabletCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor);
    // alert(' isMobile ' + check);
    return check;
  };

  get getCurrentDayOfGatha() {
    if (this.userGathaDetails.hasOwnProperty('start_date')) {
      let days = moment().diff(moment(this.userGathaDetails.start_date), 'days');
      switch (days) {
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
    this.presentLoading();
    this.userService.userNextGatha({
      studentId: this.studentData.id,
      teacherId: this.teacherData.id,
      currentGathaCount: this.userGathaDetails.current_gatha_count,
      sutraId: this.userGathaDetails.Sutra.id
    }).subscribe((res: any) => {
      // this.dismisLoading();
      this.userGathaDetails = res.data;
      this.getUserData(this.studentData.id);
      this.cdRef.detectChanges();
    }, (error) => {
      this.dismisLoading();
      console.log(' error ', error);
    })
  }

  newScan() {
    this.studentData = null;
    this.isScannig = true;
    this.selectedSutra = null;
    this.currentGathaCount = null;
    this.clearInput();
    if (this.platform.is('capacitor')) {
      this.barcodeScan();
    } else {
      setTimeout(() => {
        this.qrScannerComponent.canvasHeight = 500;
        this.qrScannerComponent.canvasWidth = 500;
        this.webScanner();
      }, 0);
    }
  }

  backToHome() {
    this.clearInput();
    this.router.navigate(['folder']);
  }

  clearInput() {
    if (this.studentIdInput) {
      this.studentIdInput.nativeElement.value = '';
    }
  }

  async onDetailsClick() {
    const modal = await this.modalController.create({
      component: StudentDetailsComponent,
      cssClass: 'modal-fullscreen',
      componentProps: { studentId: this.studentData.id }
    });
    await modal.present();
  }

  imageLoadError(event) {
    // console.log(' data ', data);
    // this.studentData.profile_image = this.PLACEHOLDER_IMAGE_URL;
    event.target.src = this.PLACEHOLDER_IMAGE_URL;
  }

  async presentLoading() {
    if (this.loading) {
      return;
    }
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      // duration: 2000
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  dismisLoading() {
    of([]).pipe(delay(2000)).subscribe(() => {
      this.loading.dismiss();
      this.loading = null;
    })
  }

  async showMessage(message: string) {
    let toast = await this.alertController.create({
      message,
      buttons: ['OK']
    });
    await toast.present();
  }
}
