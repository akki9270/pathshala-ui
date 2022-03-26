import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentWiseService } from './student-wise.service';
import { DateWiseService } from '../date-wise/date-wise.service'

@Component({
  selector: 'app-student-wise',
  templateUrl: './student-wise.component.html',
  styleUrls: ['./student-wise.component.scss'],
})
export class StudentWiseComponent implements OnInit {

  studentSearch: FormGroup;
  submited = false;
  allStudents = [];

  constructor(
    private _location: Location,
    private studentWiseService: StudentWiseService,
    private formBuilder: FormBuilder,
    private dateWiseService: DateWiseService
  ) { }

  ngOnInit() {
    this.studentWiseService.studentSearch()
      .subscribe(res => {
        this.allStudents = res['data'];
      })
  }

  backClicked() {
    this._location.back();
  }
}
