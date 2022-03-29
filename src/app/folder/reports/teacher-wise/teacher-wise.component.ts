import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherWiseService } from './teacher-wise.service';

@Component({
  selector: 'app-teacher-wise',
  templateUrl: './teacher-wise.component.html',
  styleUrls: ['./teacher-wise.component.scss'],
})
export class TeacherWiseComponent implements OnInit {

  teacherSearch: FormGroup;
  submited = false;
  allTeachers = [];
  tableData = [];
  isDatepickerShow = false;

  constructor(
    private _location: Location,
    private teacherWiseService: TeacherWiseService
  ) { }

  ngOnInit() {
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

}
