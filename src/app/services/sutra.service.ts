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

    getAllSutra(id) {
        return this.http.get(this.URL + '/getAllSutra', { params: {id} })
        .pipe(
            tap(() => console.log('getAllSutra'))
        )
    }

    getAllCategory() {
        return this.http.get(this.URL + '/getSutraCategory')
        .pipe(
            tap(() => console.log('getSutraCategory'))
        )
    }

    getAllTerminatedSutra(userId) {
        return this.http.get(this.URL + '/getAllTerminatedSutra/' + userId)
        .pipe(
            tap(() => console.log('getSutraCategory'))
        )
    }

    saveCatSutra(data) {
    return this.http.post(this.URL + '/saveCatSutra', data)
            .pipe(
                tap(() => console.log('saveCatSutra'))
            );
    }
}