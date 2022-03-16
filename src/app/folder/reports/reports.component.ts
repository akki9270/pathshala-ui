import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(public router: Router) {}

  ngOnInit() {}

  title: string = 'Reports';

  reports: report[] = [
    {
      imagePath: 'assets/images/reports.jpeg',
      title: 'Date Wise',
      routerLink: 'datewise',
      name: 'test',
    },
    {
      imagePath: 'assets/images/reports.jpeg',
      title: 'Month Wise',
      routerLink: 'monthwise',
      name: 'test',
    },
    {
      imagePath: 'assets/images/reports.jpeg',
      title: 'Sutra Wise',
      routerLink: 'sutrawise',
      name: 'test',
    },
    {
      imagePath: 'assets/images/reports.jpeg',
      title: "Teacher's Wise",
      routerLink: 'teacherwise',
      name: 'test',
    },
    {
      imagePath: 'assets/images/reports.jpeg',
      title: "Student's Wise",
      routerLink: 'studentwise',
      name: 'test',
    },
  ];

  onPathshalaClick() {
    console.log('onPathshalaClick');
  }
  onEventClick() {
    console.log('onEventClick');
  }
  onReportClick() {
    console.log('onReportClick');
  }
  onAdminClick() {
    console.log('onAdminClick');
  }
  onLogin() {}
  goBack() {}
}

class report {
  title: string;
  imagePath: string;
  name: string;
  routerLink: string;
}
