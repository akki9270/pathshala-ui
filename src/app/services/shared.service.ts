import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private teacher$ = new BehaviorSubject({});
  private student$ = new BehaviorSubject({});

  getTeacher = this.teacher$.asObservable();
  getStudent = this.student$.asObservable();

  setTeacher(data) {
    this.teacher$.next(data);
  }

  setStudent(data) {
    this.student$.next(data);
  }
}
