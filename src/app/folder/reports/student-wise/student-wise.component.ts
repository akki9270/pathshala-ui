import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentWiseService } from './student-wise.service';

@Component({
  selector: 'app-student-wise',
  templateUrl: './student-wise.component.html',
  styleUrls: ['./student-wise.component.scss'],
})
export class StudentWiseComponent implements OnInit {

  studentsearch: FormGroup;
  submited = false;

  constructor(
    private _location: Location,
    private studentWiseService: StudentWiseService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.studentsearch = this.formBuilder.group({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      point: new FormControl(null, [Validators.required])
    });
  }
  get id() { return this.studentsearch.get('id'); }
  get name() { return this.studentsearch.get('name'); }
  get point() { return this.studentsearch.get('point'); }

  studentSearch() {
    this.submited = true;
    if (this.studentsearch.valid) {
      this.studentWiseService.studentSearch(this.studentsearch.value);
      this.submited = false;
    }
  }

  backClicked() {
    this._location.back();
  }

}
