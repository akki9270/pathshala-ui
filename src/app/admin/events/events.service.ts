import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface GetEvent {
  data: {
    id: string
    event_date: string
    description: string
    event_name: string
    banner_url: string
    points: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private env = environment;
  private URL = this.env.server_url;

  constructor(private http: HttpClient) { }

  getEvent(eventId) {
    return this.http.get<GetEvent>(this.URL + '/getEventById/' + eventId)
      .pipe(
        tap((res) => console.log('getEvent'))
      )
  }

  saveEvent(event) {
    return this.http.post(this.URL + '/createEvent', event)
    .pipe(
      tap((res) => console.log('saveEvent'))
    )
  }
}
