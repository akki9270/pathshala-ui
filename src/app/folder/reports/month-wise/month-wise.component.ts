import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { MonthWiseService } from './month-wise.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-month-wise',
  templateUrl: './month-wise.component.html',
  styleUrls: ['./month-wise.component.scss'],
})
export class MonthWiseComponent implements OnInit {
  years = [];
  monthData;
  monthsearch: FormGroup;

  constructor(
    private _location: Location,
    private monthWiseService: MonthWiseService
  ) { }

  ngOnInit() {

    this.monthsearch = new FormGroup({
      year: new FormControl(''),
      month: new FormControl('')
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

    for (var i = 2000; i <= 2050; i++) {
      this.years.push({ id: i })
    }
  }

  backClicked() {
    this._location.back();
  }

  monthSearch() {
    this.monthWiseService.monthSearch(this.monthsearch.value);
  }

}
