import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonInput } from '@ionic/angular';
import { ImagePickerOptions, ImagePicker } from '@ionic-native/image-picker/ngx';
import { SutraService } from 'src/app/services/sutra.service';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { UploadService } from 'src/app/services/upload-service.service';
import { File, FileEntry, IFile } from '@ionic-native/file/ngx'

@Component({
  selector: 'app-student-master',
  templateUrl: './student-master.component.html',
  styleUrls: ['./student-master.component.scss']
})
export class StudentMasterComponent implements OnInit {

  constructor(
    public _location: Location,
    public sutraSerice: SutraService,
    public cdRef: ChangeDetectorRef,
    public sutraService: SutraService,
    public userService: UserService,
    public alertController: AlertController,
    public imagePicker: ImagePicker,
    public uploadService: UploadService,
    public file: File 
     ) { }
  studentForm: FormGroup;

  allSutra = [];
  allSutraCategory = [];
  totalGathaCount;
  isNewStudent = false;
  studentId;
  fethedSelectedSutra;
  fetchedGathaCount;
  imagePickerOptions: ImagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  }
  imageElement:any = {};

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
      currentGathaCount: new FormControl('', [Validators.required]),
  
    });
    // this.getAllSutra();
    this.getAllCategory();
    this.studentForm.get('selectedSutra').valueChanges.subscribe(value => {
      this.getGathaCount(value);
    })
    this.studentForm.get('selectedSutraCategory').valueChanges.subscribe(value => {
      this.allSutra = [];
      this.totalGathaCount = [];
      this.studentForm.patchValue({
        selectedSutra: '',
        currentGathaCount: ''
      })
      if(value) {
        this.getAllSutra(value);
      }
    });
  }

  async getImagePicker() {
    // let imageElement: any = {}
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
    this.imageElement.src = imageUrl;
    this.imageElement.filePath = image.path;
    console.log('imageElement ', image);
    this.startUpload(this.imageElement);
    // this.uploadImage(this.imageElement.filePath);

    // this.imagePicker.getPictures(this.imagePickerOptions).then(
    //   (results) => {
    //     for (var i = 0; i < results.length; i++) {
    //       this.imgRes.push('data:image/jpeg;base64,' + results[i]);
    //     }
    //   }, (error) => {
    //     alert(error);
    //   });
  }

  startUpload(imgEntry) {
    console.log('imageEntry ', imgEntry)
    this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
        .then(entry => {
            ( < FileEntry > entry).file(file => this.readFile(file))
            // ( < FileEntry > entry).file(file => this.uploadImage(file))
        })
        .catch(err => {
           // this.presentToast('Error while reading file.');
           this.showMessage('Error Reading file');
        });
}

  readFile(file: any) {
    const reader = this.getFileReader();
    reader.onload = () => {
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], {
            type: file.type
        });
        formData.append('WebAppImg', imgBlob, file.name);
        this.uploadImage(formData);
    };
    reader.onerror = () => {
      this.showMessage(' Erorr Reading with FileReader');
    }
    reader.readAsArrayBuffer(file);
}

  onFileUpload(event) {
    console.log(' files ', event.target.files);
  }
  // uploadImage(data: FormData) {
  uploadImage(data) {
    let fd = new FormData();
    fd.append('WebAppImg', data);
    this.uploadService.uploadImage(fd, 10002).subscribe(
      (res) => {
        console.log('res', res);
        this.showMessage('res ' + res['upload_path']);
      }, (err) => {
        console.log('err', err);
        this.showMessage('err ');
      }
    );
  }

  getAllCategory() {
    this.sutraSerice.getAllCategory()
    .subscribe(res => {
      // console.log('res ', res);
      if (res['data']) {
        this.allSutraCategory = res['data'];
      }
    })
  }

  getAllSutra(data) {
    this.sutraSerice.getAllSutra(data.id)
    .subscribe( res => {
      // console.log(' getAll Sutra ', res);
      this.allSutra = res['data'];
      if (this.fethedSelectedSutra) {
        let sutra = this.allSutra.find(i => i.id === this.fethedSelectedSutra.id);
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
    this.cdRef.detectChanges();
    return result;
  }

  saveData() {
    // console.log();
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }
    let data = this.studentForm.getRawValue();
    data['isNew'] = this.isNewStudent;
    data['teacherId'] = 10001 // temporary, will be removed soon
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
      this.fethedSelectedSutra = gatha.Sutra;
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

  getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
}
}
