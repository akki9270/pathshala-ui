import { Component, OnInit } from '@angular/core';
import { EventListService } from 'src/app/admin/event-list/event-list.service';
import { EventsService } from 'src/app/admin/events/events.service';
import * as moment from 'moment';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { EventAttendanceService } from 'src/app/services/event.attendance.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(
    private eventService: EventListService,
    public barcodeScanner: BarcodeScanner,
    public eventAttendanceService: EventAttendanceService,
    public sharedService: SharedService,
    public router: Router,
    public _location: Location
  ) { }
  moment = moment;
  allEventsList: any = [];
  teacherData;

  ngOnInit() {
    this.getAllEvents();
    this.sharedService.getTeacher.subscribe(data => {
      this.teacherData = data;
    })
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe(events => {
      this.allEventsList = events.data;
    });
  }

  startScan(id) {
    this.barcodeScanner.scan().then(
      ({ text, cancelled }) => {
        if (text && !cancelled) {
          this.startScan(id);
          this.eventAttendanceService.saveEventAttendance({
            studentId: text,
            teacherId: this.teacherData.id,
            eventId: id
          }).subscribe();
        }
      })
  }

  getAttendance(id) {
    let event = this.allEventsList.find(i => i.id === id);
    this.router.navigate(['/folder/EventAttendance/' + id],
      {
        state: {
          event_details: event
        }
      })
  }

  goBack() {
    this._location.back();
  }
}
