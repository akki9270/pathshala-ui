import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private _http: HTTP) { }
    private env = environment;
    private URL = this.env.server_url;

    getUserData(posted) {
        // return new Promise((resolve, reject) => {
        //     this._http.get(this.URL+'/getUserData', posted, {})
        //     .then(res => {
        //         console.log(' res ', res);
        //         resolve(res);
        //     }).catch(console.log);
        // })
        return this.http.get(this.URL + '/getUserData', { params: posted })
            .pipe(
                tap(() => console.log('getUserData'))
            )
    }

    checkAttendence(data) {
        return this.http.post(this.URL + '/check_attendance', data)
            .pipe(
                tap(() => console.log('checkAttendence'))
            )
    }

    getAttendence(data) {
        return this.http.get(this.URL + '/attendance', { params: { id: data } })
            .pipe(
                tap(() => console.log('getAttendence'))
            )
    }

    getGathaDetails(data) {
        return this.http.get(this.URL + '/getUserGatha', { params: { id: data } })
            .pipe(
                tap(() => console.log('getGathaDetails'))
            )
    }

    userNextGatha(data) {
        return this.http.post(this.URL + '/userNextGatha', data)
            .pipe(
                tap(() => console.log('userNextGatha'))
            )
    }

    updateUserSutra(data: { sutraId, gathaCount, teacherId, studentId }) {
        return this.http.post(this.URL + '/updateUserSutra', data)
            .pipe(
                tap(() => console.log('updateUserSutra'))
            );
    }

    saveUserAndGatha(data) {
        return this.http.post(this.URL + '/saveUserAndGatha', data)
            .pipe(
                tap(() => console.log('saveUserAndGatha'))
            );
    }

    updateUser(user) {
        return this.http.post(this.URL + '/updateUser', user)
            .pipe(
                tap(() => console.log('updateUser'))
            )
    }

    getRewardByDate() {
        return this.http.get(this.URL + '/getRewardByDate')
            .pipe(
                tap(() => console.log('getRewardByDate'))
            )
    }
}