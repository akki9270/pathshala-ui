import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  openLogin = false;
  email: string = '';
  password: string = '';
  USER_EMAIL = 'admin@pathshala.com';
  USER_PASSWORD = 'Admin@123';
  isTeacherLoggedIn = false;

  ngOnInit() { 
    let data = localStorage.getItem('teacher');
    if(data) {
      this.isTeacherLoggedIn = true;
    } else {
      this.onPathshalaClick();
    }
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
    this.openLogin = true;
    let teacher = localStorage.getItem('teacher');
    if (teacher) {
      teacher = JSON.parse(teacher);
      if(teacher['id'] == 1001) {
        this.email = this.USER_EMAIL;
        this.password = this.USER_PASSWORD;
      }
    }
  }
}
