import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RewardDetailsService {

  constructor(private http: HttpClient) { }
  private env = environment;
  private URL = this.env.server_url;

  fetchBookedReward(id) {
    return this.http.get(this.URL + '/getBookedReward/' + id)
      .pipe(
        tap(() => console.log('getBookedReward'))
      );
  }

  onRedeem(id) {
    return this.http.get(this.URL + '/redeemReward/' + id)
      .pipe(
        tap(() => console.log('redeemReward'))
      );
  }

  getAllReward(params) {
    return this.http.get(this.URL + '/getAllReward', { params })
      .pipe(
        tap(() => console.log('getAllReward'))
      )
  }

  bookReward(reward) {
    return this.http.post(this.URL + '/bookReward', reward)
      .pipe(
        tap(() => console.log('bookReward'))
      )
  }

  cancleReward(reward) {
    return this.http.post(this.URL + '/cancleReward', reward)
      .pipe(
        tap(() => console.log('cancleReward'))
      )
  }
  removePoint(point) {
    return this.http.post(this.URL + '/addPoint', point)
      .pipe(
        tap(() => console.log('removePoint'))
      )
  }
}
