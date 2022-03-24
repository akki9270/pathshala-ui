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

  teachersearch: FormGroup;
  submited = false;

  constructor(
    private _location: Location,
    private teacherWiseService: TeacherWiseService
  ) { }

  ngOnInit() {

    this.teachersearch = new FormGroup({
      teacher: new FormControl(null, [Validators.required])
    });
  }
  get teacher() { return this.teachersearch.get('teacher'); }

  dateWiseSearch() {
    this.submited = true;
    if (this.teachersearch.valid) {
      this.teacherWiseService.dateWiseSearch(this.teachersearch.get('teacher').value);
      this.submited = false;
    }
  }

  monthWiseSearch() {
    this.submited = true;
    if (this.teachersearch.valid) {
      this.teacherWiseService.monthWiseSearch(this.teachersearch.get('teacher').value);
      this.submited = false;
    }
  }

  backClicked() {
    this._location.back();
  }

}
