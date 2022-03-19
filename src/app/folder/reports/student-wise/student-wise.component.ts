import { Component, OnInit } from '@angular/core';

import {Location} from '@angular/common';

@Component({
  selector: 'app-student-wise',
  templateUrl: './student-wise.component.html',
  styleUrls: ['./student-wise.component.scss'],
})
export class StudentWiseComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }

}
