import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonInput } from '@ionic/angular';
import { ImagePickerOptions, ImagePicker } from '@ionic-native/image-picker/ngx';
import { SutraService } from 'src/app/services/sutra.service';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload-service.service';
import { environment } from '../../../environments/environment';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-student-master',
  templateUrl: './student-master.component.html',
  styleUrls: ['./student-master.component.scss']
})
export class StudentMasterComponent implements OnInit {

  constructor(
    public _location: Location,
    public cdRef: ChangeDetectorRef,
    public sutraService: SutraService,
    public userService: UserService,
    public alertController: AlertController,
    public imagePicker: ImagePicker,
    public uploadService: UploadService,
    public sharedService: SharedService
     ) { }
  studentForm: FormGroup;

  allSutra = [];
  allSutraCategory = [];
  totalGathaCount;
  isNewStudent = false;
  studentId;
  fetchedSelectedSutra;
  fetchedGathaCount;
  profile_image;
  imagePickerOptions: ImagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  }
  imageElement:any = {};
  PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/300';
  teacherData;

  @HostListener('keyup',['$event'])
    onKeyUp(event) {
      if (event.keyCode === 13) {
        this.getUserData();
      }
    }

  ngOnInit() {
    this.studentForm = new FormGroup({
      user_id: new FormControl({value: '', disabled: this.isNewStudent}, []), 
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      motherName: new FormControl('', []),
      // address: new FormControl('', [Validators.required]),
      house_number: new FormControl('', []),
      street: new FormControl('', []),
      area_code: new FormControl('', []),
      city: new FormControl('', []),
      
      gender: new FormControl('',[Validators.required]),
      dob: new FormControl('', [Validators.required]),
      contact1: new FormControl('', [Validators.required]),
      contact2: new FormControl('', []),
      email: new FormControl('', [Validators.email]),
      selectedSutraCategory: new FormControl('', [Validators.required]),
      selectedSutra: new FormControl('', [Validators.required]),
      currentGathaCount: new FormControl({ value: '' }, [Validators.required]),
      revisionMode: new FormControl(false,[])
    });
    // this.getAllSutra();
    this.getAllCategory();
    this.studentForm.get('selectedSutra').valueChanges.subscribe(value => {
      if (value) {
        let currentGathaCount = value.current_gatha_count || 1;
        this.studentForm.patchValue({ currentGathaCount: currentGathaCount }, { emitEvent: false });
        this.getGathaCount(value);
      }
    })
    this.studentForm.get('selectedSutraCategory').valueChanges.subscribe(value => {
      this.allSutra = [];
      this.totalGathaCount = [];
      this.studentForm.patchValue({
        selectedSutra: '',
        currentGathaCount: ''
      }, { emitEvent: false });
      if(value) {
        this.getAllSutra(value);
      }
    });
    this.uploadService.imageUploaded.subscribe( res => {
      if (res && res.status) {
        let imagePath = res['Uploaded_Path'];
        this.profile_image = imagePath;
        this.cdRef.detectChanges();
        let data = {
          profile_image: imagePath,
          id: this.studentForm.get('user_id').value
        }
        this.userService.updateUser(data).subscribe();
      }
    });
    this.sharedService.getTeacher.subscribe(data => {
      this.teacherData = data;
    });
  }

  onSelectSource() {
    this.uploadService.selectImageSource();
  }

  getAllCategory() {
    this.sutraService.getAllCategory()
    .subscribe(res => {
      // console.log('res ', res);
      if (res['data']) {
        this.allSutraCategory = res['data'];
      }
    })
  }

  getAllSutra(data) {
    this.sutraService.getAllSutra({ categoryId: data.id, studentId: this.studentForm.getRawValue().user_id })
    .subscribe( res => {
      // console.log(' getAll Sutra ', res);
      this.allSutra = res['data'];
      if (this.fetchedSelectedSutra) {
        let sutra = this.allSutra.find(i => i.id === this.fetchedSelectedSutra.id);
        this.studentForm.patchValue({
          selectedSutra: sutra,
          currentGathaCount: this.fetchedGathaCount
        })
      }
    })
  }

  addNewStudent() {
    this.isNewStudent = true;
    this.studentForm.get('user_id').enable();
    this.studentForm.reset();
  }

  getGathaCount(value) {
    let result = [];
    if (value) {
      for(let i = 1; i <= value.gatha_count; i++) {
        result.push(i)
      }
    }
    this.totalGathaCount = result;
    return result[0];
  }

  saveData() {
    // console.log();
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }
    let data = this.studentForm.getRawValue();
    data['isNew'] = this.isNewStudent;
    // data['teacherId'] = 10001 
    data['teacherId'] = this.teacherData.id;
    // data[]
    // temporary, will be removed soon
    // console.log(' student Data ', data);
    // return;
    this.userService.saveUserAndGatha(data).subscribe(
      res => {
        this.isNewStudent = false;
        this.studentForm.reset();
        if (res['data'] && res['data']['id']) {
          this.showMessage('Saved User Id is ' + res['data']['id']);
        } else {
          this.showMessage('Saved SuccessFully');
        }
      }
    )
  }

  getUserData() {
    if (!this.studentId) {
      return;
    }
    this.isNewStudent = false;
    this.studentForm.reset();
    this.userService.getUserData({id: this.studentId})
    .subscribe(res => {
      this.studentId = '';
      if (res && res['data'] && res['data'].length) {
        let data = res['data'][0];
        this.profile_image = data.profile_image
        this.uploadService.setParam({StudentID: data.id})
        // console.log(data);
        this.arrangeFormData({data, gatha: res['gatha']});
      } {

      }
      
    })
  }

  arrangeFormData({data, gatha}) {
    
    let studentData = this.studentForm.value;
    let contactArray = data.mobile.split(',');

    studentData.user_id = data.id;
    studentData.firstName = data.first_name;
    studentData.lastName = data.last_name;
    studentData.middleName = data.middle_name;
    studentData.motherName = data.mother_name;
    // studentData.address = data.address;
    studentData.house_number = data.house_number;
    studentData.street = data.street;
    studentData.area_code = data.area_code;
    studentData.city = data.city;
    studentData.revisionMode = gatha.revision_mode;
    if (data.gender) {
      studentData.gender = data.gender.toLowerCase();
    }


    studentData.dob = this.getFormattedDate(data.date_of_birth);
    studentData.contact1 = contactArray[0];
    studentData.contact2 = contactArray[1];
    studentData.email = data.email;
    studentData.selectedSutraCategory = data.selectedSutraCategory;
    studentData.selectedSutra = data.selectedSutra;
    studentData.currentGathaCount = data.currentGathaCount;

    if (gatha) {
      let category = gatha.Sutra.SutraCategory;
      let cat = this.allSutraCategory.find(i => i.id = category.id);
      studentData['selectedSutraCategory']= cat;
      this.fetchedSelectedSutra = gatha.Sutra;
      this.fetchedGathaCount = gatha.current_gatha_count;
    }
    // this.isNewStudent = true;
    // console.log('studentData ', studentData);
    
    this.studentForm.patchValue(studentData);
    setTimeout(() => {
      if(!this.isNewStudent) {
        this.studentForm.get('user_id').disable();
      }
    }, 100);
    this.studentForm.updateValueAndValidity();
  }

  getFormattedDate(date: string | Date) {
    if(typeof date === 'string') {
      let d = new Date(date);
      let month: string | number = (d.getMonth() + 1);
      month = month < 10 ? ('0' + month ) : month;
      let day: any = d.getDate();
      day = day > 9 ? day : '0' + day;
      return `${d.getFullYear()}-${month}-${day}`;
    }
  }

  goBack() {
    this._location.back();
  }

  closeForm() {
    this.studentForm.reset();
    this.studentForm.markAsPristine();
    this.studentId = '';
    this.isNewStudent = false;
  }

  async showMessage(message = '', duration = 2000) {
    let toast = await this.alertController.create({ 
      message,
      buttons: ['OK']
    });
    toast.present();
  }

  imageLoadError(event) {
    // console.log(' data ', data);
    // this.studentData.profile_image = this.PLACEHOLDER_IMAGE_URL;
    event.target.src = this.PLACEHOLDER_IMAGE_URL;
  }

}
