import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from './events.service';
import { formatDate } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  
  eventForm: FormGroup;
  submitted: Boolean = false;
  eventId;
  editBtn: Boolean;
  tommorow : Date = moment().add(1,'days').toDate();
  minDate: String = formatDate(this.tommorow, 'yyyy-MM-dd', 'en');

    constructor(
      private formBuilder: FormBuilder,
      private activeRoute: ActivatedRoute,
      private eventsService: EventsService,
      private router: Router,
      ) { }

  ngOnInit() {

    this.activeRoute.paramMap.subscribe((params) => {
      this.eventId = params.get("id");
    });

    if (this.eventId) {
      this.editBtn = true;
      this.fetchEvent(this.eventId);
    } else {
      this.editBtn = false;
    }

    this.eventForm = this.formBuilder.group({
      id: new FormControl(),
      event_date: new FormControl(Date, Validators.required),
      description: new FormControl("", Validators.required),
      banner_url: new FormControl("", Validators.required),
      points: new FormControl("", Validators.required),
      event_name: new FormControl("", [
        Validators.required,
        // Validators.pattern("[A-Za-z ]+"),
      ]),
       
    });
  }

  onSave(){
    this.submitted = true;
    if(this.eventForm.valid) {
      this.eventsService.saveEvent(this.eventForm.value)
      .subscribe(res => {
        this.submitted = false;
        this.eventForm.reset()
        this.router.navigate(['/EventList'])
      })
    }
  }

  fetchEvent(eventId) {
    this.eventsService.getEvent(eventId)
    .subscribe(res => {
      let event = {
        id: res.data.id,
        event_date: formatDate(res.data.event_date, 'yyyy-MM-dd', 'en'),
        description: res.data.description,
        banner_url: res.data.banner_url,
        points: res.data.points,
        event_name: res.data.event_name
      }
      this.eventForm.patchValue(event)
    })
  }

}
