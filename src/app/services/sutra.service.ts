import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class SutraService {
    constructor(
        private http: HttpClient
    ) { }
    private env = environment;
    private URL = this.env.server_url;

    getAllSutra() {
        return this.http.get(this.URL + '/getAllSutra')
        .pipe(
            tap(() => console.log('getAllSutra'))
        )
    }
}