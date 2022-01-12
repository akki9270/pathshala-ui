import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
  ) { }
  openLogin = false;
  email: string = '';
  password: string = '';
  USER_EMAIL = 'admin@pathshala.com';
  USER_PASSWORD = 'Admin@123';
  isTeacherLoggedIn = false;
  teacherData = {}

  ngOnInit() { 
    this.sharedService.getTeacher.subscribe( (data: any) => {
      if(data && data.hasOwnProperty('id')) {
        this.teacherData = this.teacherData;
        this.isTeacherLoggedIn = true;
      } else {
        this.onPathshalaClick();
      }
    })
    // let data = localStorage.getItem('teacher');
  }

  onPathshalaClick() {
    this.router.navigate(['Pathshala'], { relativeTo: this.activatedRoute });
  }

  onLogin() {
    if(this.email === this.USER_EMAIL && this.password === this.USER_PASSWORD) {
      this.router.navigate(['admin']);
    }
  }
  goBack() {
    this.openLogin = false;
  }

  onAdminClick() {
    // this.openLogin = true;
    // let teacher = localStorage.getItem('teacher');
    if (this.isTeacherLoggedIn) {
      // teacher = JSON.parse(teacher);
      if(this.teacherData['id'] == 1001) {
        this.email = this.USER_EMAIL;
        this.password = this.USER_PASSWORD;
      }
    }
  }
}
