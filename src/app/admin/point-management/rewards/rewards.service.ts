import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface response {
  data: {}
}
@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  private env = environment;
  private URL = this.env.server_url;

  constructor(private http: HttpClient) { }

  getReward(params) {
    return this.http.get<response>(this.URL + '/getAllReward', { params })
      .pipe(
        tap(() => console.log('getAllReward'))
      )
  }

  deleteReward(rewardId) {
    return this.http.delete(this.URL + '/deleteReward/' + rewardId)
      .pipe(
        tap((res) => console.log('deleteReward'))
      )
  }

}
