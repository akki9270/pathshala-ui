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
  dateSearch: FormGroup;
  submited = false;

  constructor
    (
      private _location: Location,
      private dateWiseService: DateWiseService
    ) {
  }

  ngOnInit() {
    this.tableData = this.dateWiseService.fetchTableData();
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
      this.dateWiseService.dateSearch(this.dateSearch.get('date').value);
      this.submited = false;
    }
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
}
