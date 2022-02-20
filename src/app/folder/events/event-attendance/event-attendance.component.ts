import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventAttendanceService } from 'src/app/services/event.attendance.service';

@Component({
  selector: 'app-event-attendance',
  templateUrl: './event-attendance.component.html',
  styleUrls: ['./event-attendance.component.scss']
})
export class EventAttendanceComponent implements OnInit {

  constructor(
    public eventAttendanceService: EventAttendanceService,
    public actieRoute: ActivatedRoute,
    public router: Router,
    public _location: Location
  ) { 
    if (this.router.getCurrentNavigation().extras.state) {
      this.eventDetails = this.router.getCurrentNavigation().extras.state.event_details;
    }
  }
  attendanceList: any = [];
  eventId: string | number;
  eventDetails

  ngOnInit() {
    this.eventId = this.actieRoute.snapshot.params['id'];
    this.getAttendance();
  }

  getAttendance() {
    this.eventAttendanceService.getEventAttendance(this.eventId)
    .subscribe(res => {
      this.attendanceList = res['data'];
    })
  }

  goBack() {
    this._location.back();
  }
}
