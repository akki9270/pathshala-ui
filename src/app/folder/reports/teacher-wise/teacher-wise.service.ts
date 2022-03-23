import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherWiseService {

  constructor() { }

  dateWiseSearch(teacher) {
    console.log('datewise teacher service :', teacher);
  }
  monthWiseSearch(teacher) {
    console.log('datewise teacher service :', teacher);
  }
}
