import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherWiseService {

  constructor(private http: HttpClient) { }
  private env = environment;
  private URL = this.env.server_url;

  getAllTeachers() {
    return this.http.get(this.URL + '/getAllTeacher')
      .pipe(
        tap(() => console.log('getAllTeacher'))
      )
  }

  dateWiseSearch(params) {
    return this.http.get(this.URL + '/getTeacherSelectedDate', { params })
      .pipe(
        tap(() => console.log('getTeacherSelectedDate'))
      )
  }
  monthWiseSearch(teacher) {
    console.log('datewise teacher service :', teacher);
  }
}
