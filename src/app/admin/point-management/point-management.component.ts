import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-point-management',
  templateUrl: './point-management.component.html',
  styleUrls: ['./point-management.component.scss'],
})
export class PointManagementComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() { }

  navigate(path: string) {
    this.router.navigate([path]);
  }

}
