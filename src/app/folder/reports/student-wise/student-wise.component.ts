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
  tableData = [];
  filteredData = [];

  constructor(
    private _location: Location,
    private studentWiseService: StudentWiseService,
    private formBuilder: FormBuilder,
    private dateWiseService: DateWiseService
  ) { }

  ngOnInit() {
    this.tableData = this.dateWiseService.fetchTableData();
    this.filteredData = this.tableData;

    this.studentSearch = this.formBuilder.group({
      id: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
      name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      point: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')])
    });
  }
  get id() { return this.studentSearch.get('id'); }
  get name() { return this.studentSearch.get('name'); }
  get point() { return this.studentSearch.get('point'); }

  onStudentSearch() {
    this.submited = true;
    if (this.studentSearch.valid) {
      this.studentWiseService.studentSearch(this.studentSearch.value);
      this.submited = false;
    }
  }

  backClicked() {
    this._location.back();
  }
  filteredList(search) {
    this.filteredData = this.tableData.filter(stuedent => {
      return search ? stuedent.name.toLowerCase().includes(search.toLowerCase()) : this.tableData
    })
  }
}
