import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface ApiImage {
  _id: string;
  name: string;
  createdAt: Date;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private URL = environment.image_upload_url || 'http://hiteshvidhikar.com/pathshala/ImageUpload.php';
  private imageUploadeder$ = new BehaviorSubject(null);
  imageUploaded = this.imageUploadeder$.asObservable();
  // private URL = 'https://maunank.com/API/ImageUpload.php?AuthKey=WebApp@Pathshala*99&StudentID={studentID}';
  PARAMS = {
    AuthKey:'WebApp@Pathshala*99',
    StudentID: ''
  }
  fileInput;
  constructor(
    private http: HttpClient, 
    private actionSheetCtrl: ActionSheetController,
    private plt: Platform) { }

  setParam(data) {
    this.PARAMS = {
      ...this.PARAMS,
      ...data
    }
  }

  getImages() {
    return this.http.get<ApiImage[]>(`${this.URL}/image`);
  }
 
  uploadImage(blobData, name, ext) {
    const formData = new FormData();
    formData.append('WebAppImg', blobData, `myimage.${ext}`);
    formData.append('name', name);
 
    return this.http.post(`${this.URL}`, formData, { params: this.PARAMS });
  }
 
  uploadImageFile(file: File) {
    const ext = file.name.split('.').pop();
    const formData = new FormData();
    formData.append('WebAppImg', file, `myimage.${ext}`);
    formData.append('name', file.name);
 
    return this.http.post(`${this.URL}`, formData, { params: this.PARAMS });
  }

  async selectImageSource() {
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: 'Choose From Photos Photo',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      }
    ];

    // Only allow file selection inside a browser
    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a File',
        icon: 'attach',
        handler: () => {
          if (this.fileInput) {
            this.fileInput.nativeElement.click();
          }
        }
      });
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    });
    await actionSheet.present();
  }

  async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source
    });

    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
    const imageName = 'Give me a name';

    this.uploadImage(blobData, imageName, image.format).subscribe((res) => {
      // this.images.push(newImage);
      console.log('  image upload res ', res);
      if (res['status']) {
        this.imageUploadeder$.next(res);
      }
    });
  }

  // Used for browser direct file upload
  uploadFile(event) {
    const eventObj = event;
    const target: HTMLInputElement = eventObj['target'] as HTMLInputElement;
    const file: File = target.files[0];
    this.uploadImageFile(file).subscribe((newImage: ApiImage) => {
      // this.images.push(newImage);
    });
  }

  deleteImage(image: ApiImage, index) {
    // this.deleteImage(image._id).subscribe(res => {
    //   this.images.splice(index, 1);
    // });
  }

  // Helper function
  // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
