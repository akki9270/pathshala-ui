import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { TeacherWiseService } from './teacher-wise.service';

@Component({
  selector: 'app-teacher-wise',
  templateUrl: './teacher-wise.component.html',
  styleUrls: ['./teacher-wise.component.scss'],
})
export class TeacherWiseComponent implements OnInit {
  teachersearch: FormGroup;

  constructor(
    private _location: Location,
    private teacherWiseService: TeacherWiseService
  ) { }

  ngOnInit() {

    this.teachersearch = new FormGroup({
      teacher: new FormControl('')
    });
  }

  dateWiseSearch() {
    this.teacherWiseService.dateWiseSearch(this.teachersearch.get('teacher').value);
  }

  monthWiseSearch() {
    this.teacherWiseService.monthWiseSearch(this.teachersearch.get('teacher').value);
  }

  backClicked() {
    this._location.back();
  }

}
