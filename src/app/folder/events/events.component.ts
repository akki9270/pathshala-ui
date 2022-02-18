import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  
  eventForm: FormGroup;
  submitted: Boolean = false;
  eventId;
  editBtn: Boolean

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
      date: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      benner: new FormControl("", Validators.required),
      point: new FormControl("", Validators.required),
      name: new FormControl("", [
        Validators.required,
        // Validators.pattern("[A-Za-z ]+"),
      ]),
       
    });
  }

  onSave(){
    this.submitted = true;
    if(this.eventForm.valid) {
      console.log('onSave :: ', this.eventForm.value)
      this.submitted = false;
      this.eventForm.reset()
      this.router.navigate(['/folder/EventList'])
    }
  }

  fetchEvent(eventId) {
    this.eventsService.getEvent(eventId)
    .subscribe(res => {
      let event = {
        date: '',
        description: res.description,
        banner: '',
        point: res.price,
        name: res.title
      }
      this.eventForm.patchValue(event)
    })
  }

}
