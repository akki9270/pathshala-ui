import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

interface event {
  category: string
  description: string
  title: string
  id: number
  price: number
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvent(eventId) {
    return this.http.get<event>('https://fakestoreapi.com/products/' + eventId)
    .pipe(
        tap((res) => console.log('getEvent'))
    )
}
}
