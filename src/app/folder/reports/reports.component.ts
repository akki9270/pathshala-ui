import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from '@angular/common';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  isTeacherLoggedIn;
  openLogin;
  email;
  password;
  name;

  constructor
    (
      public router: Router,
      private _location: Location
    ) { }

  ngOnInit() { }

  backClicked() {
    this._location.back();
  }

  title: string = 'Reports';

  reports: report[] = [
    {
      imagePath: 'assets/images/dates.jpg',
      title: 'Date Wise',
      routerLink: 'datewise',
      name: 'test',
    },
    {
      imagePath: 'assets/images/months.jpg',
      title: 'Month Wise',
      routerLink: 'monthwise',
      name: 'test',
    },
    {
      imagePath: 'assets/images/sutra.jpeg',
      title: 'Sutra Wise',
      routerLink: 'sutrawise',
      name: 'test',
    },
    {
      imagePath: 'assets/images/teacher.png',
      title: "Teacher's Wise",
      routerLink: 'teacherwise',
      name: 'test',
    },
    {
      imagePath: 'assets/images/students.png',
      title: "Student's Wise",
      routerLink: 'studentwise',
      name: 'test',
    },
  ];

}

class report {
  title: string;
  imagePath: string;
  name: string;
  routerLink: string;
}
