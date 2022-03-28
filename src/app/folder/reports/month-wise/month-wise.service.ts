import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonthWiseService {
  private env = environment;
  private URL = this.env.server_url;

  constructor(private http: HttpClient) { }

  onMonthSearch(params) {
    return this.http.get(this.URL + '/getMonthWiseStudentData', { params })
      .pipe(
        tap(() => console.log('getMonthWiseStudentData'))
      )
  }
}
