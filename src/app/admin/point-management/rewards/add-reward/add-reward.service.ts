import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface GetReward {
  data: {
    id: string
    name: string
    required_point: string
    item_image_url: string
    description: string
    start_date: string
    end_date: string
    announcement_date: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class AddRewardService {

  constructor(private http: HttpClient) { }
  private env = environment;
  private URL = this.env.server_url;


  createReward(Reward) {
    return this.http.post(this.URL + '/createReward', Reward)
      .pipe(
        tap(() => console.log('createReward'))
      )
  }

  //   getReward(rewardId) {
  //     return this.http.get<GetReward>(this.URL + '/getRewardById/' + rewardId)
  //       .pipe(
  //         tap((res) => console.log('getReward'))
  //       )
  //   }
}
