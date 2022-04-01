import { Component, OnInit, ViewChild } from '@angular/core';

import { Location } from '@angular/common';
import { DateWiseService } from './date-wise.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-date-wise',
  templateUrl: './date-wise.component.html',
  styleUrls: ['./date-wise.component.scss'],
})
export class DateWiseComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;
  dtElement: DataTableDirective;

  tableData = [];
  dateSearch: FormGroup;
  submited = false;
  noData = true;
  moment = moment;
  attendance = 0;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor
    (
      private _location: Location,
      private dateWiseService: DateWiseService
    ) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    this.dateSearch = new FormGroup({
      date: new FormControl(null, [Validators.required])
    });
  }

  onDateSearch() {
    this.submited = true;
    if (this.dateSearch.valid) {
      let date = this.dateSearch.get('date').value
      this.dateWiseService.dateSearch({ date })
        .subscribe(res => {
          this.tableData = res['data'];
          this.rerender();

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

  backClicked() {
    this._location.back();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }
  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
