import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointLedgerService {

  constructor(private http: HttpClient) { }
  private env = environment;
  private URL = this.env.server_url;

  studentPoint() {
    return this.http.get(this.URL + '/getAllPoint')
      .pipe(
        tap(() => console.log('getAllPoint'))
      )
  }
}
