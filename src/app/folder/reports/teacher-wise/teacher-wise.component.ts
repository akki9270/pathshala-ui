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

  constructor(
    private _location: Location,
    private teacherWiseService: TeacherWiseService
  ) { }

  ngOnInit() {

    this.teacherSearch = new FormGroup({
      teacher: new FormControl(null, [Validators.required])
    });
  }
  get teacher() { return this.teacherSearch.get('teacher'); }

  onDateWiseSearch() {
    this.submited = true;
    if (this.teacherSearch.valid) {
      this.teacherWiseService.dateWiseSearch(this.teacherSearch.get('teacher').value);
      this.submited = false;
    }
  }

  onMonthWiseSearch() {
    this.submited = true;
    if (this.teacherSearch.valid) {
      this.teacherWiseService.monthWiseSearch(this.teacherSearch.get('teacher').value);
      this.submited = false;
    }
  }

  backClicked() {
    this._location.back();
  }

}
