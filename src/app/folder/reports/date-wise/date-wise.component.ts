import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { DateWiseService } from './date-wise.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-wise',
  templateUrl: './date-wise.component.html',
  styleUrls: ['./date-wise.component.scss'],
})
export class DateWiseComponent implements OnInit {

  tableData = [];
  datesearch: FormGroup;

  constructor
    (
      private _location: Location,
      private dateWiseService: DateWiseService
    ) { }

  ngOnInit() {
    this.tableData = this.dateWiseService.fetchTableData();
    this.datesearch = new FormGroup({
      date: new FormControl('')
    });
  }

  backClicked() {
    this._location.back();
  }

  dateSearch() {
    this.dateWiseService.dateSearch(this.datesearch.get('date').value);
  }
}
