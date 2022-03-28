import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { MonthWiseService } from './month-wise.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-month-wise',
  templateUrl: './month-wise.component.html',
  styleUrls: ['./month-wise.component.scss'],
})
export class MonthWiseComponent implements OnInit {
  years = [];
  monthData = [];
  monthSearch: FormGroup;
  tableData = [];
  averege = 0;
  max = 0;
  min = 0;

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

    this.monthSearch = new FormGroup({
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

    this.monthSearch.controls['year'].patchValue(this.years[0].id)
    this.monthSearch.controls['month'].patchValue(this.monthData[0].id)
  }

  backClicked() {
    this._location.back();
  }

  onMonthSearch() {
    if (this.monthSearch.valid) {
      let year = this.monthSearch.controls['year'].value;
      let month = this.monthSearch.controls['month'].value;
      let startDate = moment([year, month - 1]);
      let endDate = moment(startDate).endOf('month');
      let dateObj = { startDate: moment(startDate).format('yyyy-MM-DD'), endDate: moment(endDate).format('yyyy-MM-DD') }

      this.monthWiseService.onMonthSearch(dateObj)
        .subscribe(res => {
          this.tableData = res['monthData'];
          let total = this.tableData.reduce(function (sum, current) {
            return sum + current.count;
          }, 0);
          this.averege = Math.round(total / this.tableData.length);
          this.max = Math.max.apply(Math, this.tableData.map(function (o) { return o.count; }))
          this.min = Math.min.apply(Math, this.tableData.map(function (o) { return o.count; }))
        })
    }
  }

}
