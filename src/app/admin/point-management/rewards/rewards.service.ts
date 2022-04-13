import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  private env = environment;
  private URL = this.env.server_url;

  constructor(private http: HttpClient) { }

  getReward(params) {
    return this.http.get(this.URL + '/getAllReward', { params })
      .pipe(
        tap(() => console.log('getAllReward'))
      )
  }
}
