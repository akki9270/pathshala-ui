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
  temp = [];
  tableData = [];
  averege = 0;
  max = 0;
  min = 0;
  startDate;
  endDate;

  constructor(
    private _location: Location,
    private monthWiseService: MonthWiseService
  ) { }

  ngOnInit() {

    let date = new Date();
    let year = date.getFullYear();
    for (let i = year - 5; i <= year; i++) {
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
    this.temp = [];
    if (this.monthSearch.valid) {
      let year = this.monthSearch.controls['year'].value;
      let month = this.monthSearch.controls['month'].value;
      let startDate = moment([year, month - 1]);
      let endDate = moment(startDate).endOf('month');
      this.startDate = moment(startDate).format('yyyy-MM-DD');
      this.endDate = moment(endDate).format('yyyy-MM-DD');
      let dateObj = { startDate: this.startDate, endDate: this.endDate }

      this.monthWiseService.onMonthSearch(dateObj)
        .subscribe(res => {
          this.tableData = [];
          if (res['monthData'].length) {
            this.temp = res['monthData'];
            this.onDate(res['monthData'])

            let total = this.temp.reduce(function (sum, current) {
              return sum + current.count;
            }, 0);
            this.averege = Math.round(total / this.temp.length);
            this.max = Math.max.apply(Math, this.temp.map(function (o) { return o.count; }))
            this.min = Math.min.apply(Math, this.temp.map(function (o) { return o.count; }))
          } else {
            this.tableData.push({ date: 'No data available!', count: 'No data available!' })
          }
        })
    }
  }

  onDate(data) {
    let start = Number(moment(this.startDate).format('DD'))
    let end = Number(moment(this.endDate).format('DD'))
    let month = Number(moment(this.endDate).format('MM'))
    let year = Number(moment(this.endDate).format('yyyy'))

    for (let i = start; i <= end; i++) {
      let date = moment(`${year}-${month}-${i}`).format('yyyy-MM-DD');

      if (data.find(obj => obj.Date === date)) {
        let obj = data.find(obj => obj.Date === date)
        this.tableData.push({ date: date, count: obj.count })
      } else {
        this.tableData.push({ date: date, count: 'Holliday' })
      }
    }
  }

}
