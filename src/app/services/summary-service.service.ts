import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(public http: HttpClient) { }

  private env = environment;
  private URL = this.env.server_url;

  // params: id: studentId, year: year
  getAttandanceSummary(params) {
    return this.http.get(this.URL + '/getAttandanceSummary', { params })
      .pipe(
        tap(() => console.log('getAttendanceSummary'))
      )
  }

  // params: id: studentId, year: year
  getSutraSummary(params) {
    return this.http.get(this.URL + '/getSutraSummary', { params })
      .pipe(
        tap(() => console.log('getSutraSummary'))
      )
  }

  // params: id: studentId, year: year
  getUserSutraSummary(params) {
    return this.http.get(this.URL + '/getUserSutraSummary', { params })
      .pipe(
        tap(() => console.log('getUserSutraSummary'))
      )
  }
}
