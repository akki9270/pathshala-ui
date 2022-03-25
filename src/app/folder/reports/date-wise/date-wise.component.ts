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
        })
      this.submited = false;
    }
  }
  get totalRows(): number {
    return this.tableData.length;
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
}
