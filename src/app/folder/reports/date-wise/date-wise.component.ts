import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

@Component({
  selector: 'app-date-wise',
  templateUrl: './date-wise.component.html',
  styleUrls: ['./date-wise.component.scss'],
})
export class DateWiseComponent implements OnInit {

  tableData;

  constructor
    (
      private _location: Location
    ) { }

  ngOnInit() {
    this.tableData = [
      {
        id: 1,
        name: 'test',
        time: '123',
      },
      {
        id: 2,
        name: 'test',
        time: '123',
      },
      {
        id: 3,
        name: 'test',
        time: '123',
      },
      {
        id: 4,
        name: 'test',
        time: '123',
      },
      {
        id: 5,
        name: 'test',
        time: '123',
      },
      {
        id: 6,
        name: 'test',
        time: '123',
      },
      {
        id: 7,
        name: 'test',
        time: '123',
      },
      {
        id: 8,
        name: 'test',
        time: '123',
      },
      {
        id: 9,
        name: 'test',
        time: '123',
      },
      {
        id: 10,
        name: 'test',
        time: '123',
      },
      {
        id: 11,
        name: 'test',
        time: '123',
      },
      {
        id: 12,
        name: 'test',
        time: '123',
      },
      {
        id: 13,
        name: 'test',
        time: '123',
      },
      {
        id: 14,
        name: 'test',
        time: '123',
      },
      {
        id: 15,
        name: 'test',
        time: '123',
      },
    ];
  }

  backClicked() {
    this._location.back();
  }
}
