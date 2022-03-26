import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { DateWiseService } from './date-wise.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-date-wise',
  templateUrl: './date-wise.component.html',
  styleUrls: ['./date-wise.component.scss'],
})
export class DateWiseComponent implements OnInit {

  tableData = [];
  dateSearch: FormGroup;
  submited = false;
  noData = true;
  moment = moment;
  attendance = 0;

  constructor
    (
      private _location: Location,
      private dateWiseService: DateWiseService
    ) {
  }

  ngOnInit() {
    this.dateSearch = new FormGroup({
      date: new FormControl(null, [Validators.required])
    });
  }
  get date() { return this.dateSearch.get('date'); }

  backClicked() {
    this._location.back();
  }

  onDateSearch() {
    this.submited = true;
    if (this.dateSearch.valid) {
      let date = this.dateSearch.get('date').value
      this.dateWiseService.dateSearch({ date })
        .subscribe(res => {
          this.tableData = res['data'];
          let attendance = this.tableData.filter(student => student.is_present === 1)
          this.attendance = attendance.length
          this.noData = this.tableData.length ? false : true;
        })
      this.submited = false;
    }
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
}
