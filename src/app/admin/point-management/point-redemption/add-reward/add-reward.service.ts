import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddRewardService {

  constructor(private http: HttpClient) { }
  private env = environment;
  private URL = this.env.server_url;

  getReward(params) {
    return this.http.get(this.URL + '/getAllReward', { params })
      .pipe(
        tap(() => console.log('getAllReward'))
      )
  }

  createReward(Reward) {
    return this.http.post(this.URL + '/createReward', Reward)
      .pipe(
        tap(() => console.log('createReward'))
      )
  }
}
