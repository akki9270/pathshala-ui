import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BonusPointService {

  constructor() { }

  bonusSearch(data) {
    console.log('service bonusPoint search :', data);
  }
}
