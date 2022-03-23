import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentWiseService {

  constructor() { }

  studentSearch(data) {
    console.log('service students search :', data);
  }
}
