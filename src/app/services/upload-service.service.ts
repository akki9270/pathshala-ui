import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  // private URL = 'http://hiteshvidhikar.com/pathshala/ImageUpload.php?AuthKey=WebApp@Pathshala*99&studentID={studentID}';
  private URL = 'https://maunank.com/API/ImageUpload.php?AuthKey=WebApp@Pathshala*99&StudentID={studentID}';
  // PARAMS = {
  //   AuthKey:'WebApp@Pathshala*99',
  //   studentID: ''
  // }
  constructor(private http: HttpClient) { }
  uploadImage(body, studentId) {
    // let params_new = this.PARAMS.studentID = studentId;
    let URL = this.URL.replace('{studentID}', studentId);
    console.log(' URL IS ', URL);
    return this.http.post(URL, body, {headers: { 'Content-Type': 'multipart/form-data'}}).pipe(
      tap(() => console.log('uploadImage'))
    )
  }
}
