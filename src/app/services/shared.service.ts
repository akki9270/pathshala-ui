import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private teacher$ = new BehaviorSubject({});

  getTeacher = this.teacher$.asObservable();

  setTeacher(data) {
    this.teacher$.next(data);
  }
}
