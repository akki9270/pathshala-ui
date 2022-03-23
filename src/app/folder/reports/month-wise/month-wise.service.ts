import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthWiseService {

  constructor() { }

  monthSearch(data) {
    console.log('service monthdata search :', data);
  }
}
