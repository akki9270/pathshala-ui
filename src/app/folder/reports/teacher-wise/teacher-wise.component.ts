import { Component, OnInit } from '@angular/core';

import {Location} from '@angular/common';

@Component({
  selector: 'app-teacher-wise',
  templateUrl: './teacher-wise.component.html',
  styleUrls: ['./teacher-wise.component.scss'],
})
export class TeacherWiseComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }

}
