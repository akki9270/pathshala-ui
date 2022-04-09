import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonusPointService {

  constructor(private http: HttpClient) { }
  private env = environment;
  private URL = this.env.server_url;

  bonusPoint() {
    return this.http.get(this.URL + '/getAllStudent')
      .pipe(
        tap(() => console.log('getAllStudent'))
      )
  }

  addPoint(point) {
    return this.http.post(this.URL + '/addPoint', point)
      .pipe(
        tap(() => console.log('addPoint'))
      )
  }
}
