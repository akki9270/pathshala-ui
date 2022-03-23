import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { StudentWiseService } from './student-wise.service';

@Component({
  selector: 'app-student-wise',
  templateUrl: './student-wise.component.html',
  styleUrls: ['./student-wise.component.scss'],
})
export class StudentWiseComponent implements OnInit {

  studentsearch: FormGroup;

  constructor(
    private _location: Location,
    private studentWiseService: StudentWiseService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.studentsearch = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      point: new FormControl('')
    });

  }

  studentSearch() {
    this.studentWiseService.studentSearch(this.studentsearch.value);
  }

  backClicked() {
    this._location.back();
  }

}
