import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class EventListService {
    constructor(
        private http: HttpClient
    ) { }
    // private env = environment;
    // private URL = this.env.server_url;

    getAllEvents() {
        return this.http.get('https://fakestoreapi.com/products')
        .pipe(
            tap((res) => console.log('getAllEvents'))
        )
    }
}