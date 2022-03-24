import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { DateWiseService } from './date-wise.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-wise',
  templateUrl: './date-wise.component.html',
  styleUrls: ['./date-wise.component.scss'],
})
export class DateWiseComponent implements OnInit {

  tableData = [];
  datesearch: FormGroup;
  submited = false;

  constructor
    (
      private _location: Location,
      private dateWiseService: DateWiseService
    ) {
  }

  ngOnInit() {
    this.tableData = this.dateWiseService.fetchTableData();
    this.datesearch = new FormGroup({
      date: new FormControl(null, [Validators.required])
    });
  }
  get date() { return this.datesearch.get('date'); }


  backClicked() {
    this._location.back();
  }

  dateSearch() {
    this.submited = true;
    if (this.datesearch.valid) {
      this.dateWiseService.dateSearch(this.datesearch.get('date').value);
      this.submited = false;
    }
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
}
