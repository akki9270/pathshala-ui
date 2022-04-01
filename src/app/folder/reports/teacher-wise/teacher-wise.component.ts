import { Component, OnInit, ViewChild } from '@angular/core';

import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherWiseService } from './teacher-wise.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-teacher-wise',
  templateUrl: './teacher-wise.component.html',
  styleUrls: ['./teacher-wise.component.scss'],
})
export class TeacherWiseComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;
  dtElement: DataTableDirective;

  teacherSearch: FormGroup;
  submited = false;
  allTeachers = [];
  tableData = [];
  isDatepickerShow = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _location: Location,
    private teacherWiseService: TeacherWiseService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.teacherWiseService.getAllTeachers()
      .subscribe(res => {
        this.allTeachers = res['data'];
      })
    this.teacherSearch = new FormGroup({
      teacherId: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required])
    });
  }

  onDateWiseSearch() {
    this.isDatepickerShow = true;
  }

  onSearch() {
    this.submited = true;
    if (this.teacherSearch.valid) {
      this.teacherWiseService.dateWiseSearch(this.teacherSearch.value)
        .subscribe(res => {
          this.tableData = res['teacherData'];
          this.rerender();
        })
      this.submited = false;
    }
  }

  onMonthWiseSearch() {
    this.isDatepickerShow = false;
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
