import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { MonthWiseService } from './month-wise.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-month-wise',
  templateUrl: './month-wise.component.html',
  styleUrls: ['./month-wise.component.scss'],
})
export class MonthWiseComponent implements OnInit {
  years = [];
  monthData;
  monthsearch: FormGroup;
  submited = false;

  constructor(
    private _location: Location,
    private monthWiseService: MonthWiseService
  ) { }

  ngOnInit() {

    let date = new Date();
    let year = date.getFullYear();
    for (var i = year - 5; i <= year; i++) {
      this.years.push({ id: i })
    }

    this.monthsearch = new FormGroup({
      year: new FormControl(null, [Validators.required]),
      month: new FormControl(null, [Validators.required])
    });

    this.monthData = [
      {
        id: 1,
        name: 'Janaury'
      },
      {
        id: 2,
        name: 'February'
      },
      {
        id: 3,
        name: 'March'
      },
      {
        id: 4,
        name: 'April'
      },
      {
        id: 5,
        name: 'May'
      },
      {
        id: 6,
        name: 'June'
      },
      {
        id: 7,
        name: 'July'
      },
      {
        id: 8,
        name: 'August'
      },
      {
        id: 9,
        name: 'September'
      },
      {
        id: 10,
        name: 'October'
      },
      {
        id: 11,
        name: 'November'
      },
      {
        id: 12,
        name: 'December'
      },
    ]
  }
  get year() { return this.monthsearch.get('year'); }
  get month() { return this.monthsearch.get('month'); }

  backClicked() {
    this._location.back();
  }

  monthSearch() {
    this.submited = true;
    if (this.monthsearch.valid) {
      this.monthWiseService.monthSearch(this.monthsearch.value);
      this.submited = false;
    }
  }

}
