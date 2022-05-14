import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookedRewardsService {

  constructor(private http: HttpClient) { }
  private env = environment;
  private URL = this.env.server_url;

  getAllBookRewards() {
    return this.http.get(this.URL + '/getAllBookedReward')
      .pipe(
        tap(() => console.log('getAllBookRewards'))
      )
  }
}
