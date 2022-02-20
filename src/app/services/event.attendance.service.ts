import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class EventAttendanceService {
    constructor(
        private http: HttpClient
    ) { }
    private env = environment;
    private URL = this.env.server_url;

    getEventAttendance(id) {
        return this.http.get(`${this.URL}/eventAttendence/${id}`)
        .pipe( tap(() =>  console.log('getEventAttendance') ) )
    }

    saveEventAttendance(body) {
        return this.http.post(`${this.URL}/saveEventAttendence`, body)
        .pipe( tap(() =>  console.log('saveEventAttendance') ) )
    }
}
