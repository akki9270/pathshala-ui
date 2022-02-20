import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface response {
    data: {}
}

@Injectable({providedIn: 'root'})
export class EventListService {
    
    private env = environment;
    private URL = this.env.server_url;

    constructor(
        private http: HttpClient
    ) { }

    getAllEvents() {
        return this.http.get<response>(this.URL + '/getAllEvent')
        .pipe(
            tap((res) => console.log('getAllEvents'))
        )
    }
}