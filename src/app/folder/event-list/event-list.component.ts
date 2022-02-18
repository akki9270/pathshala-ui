import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventListService } from './event-list.service'


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {

  constructor(
    public eventService: EventListService, 
    private router: Router, 
  ) { }

  allEventsList;

  ngOnInit() {
    this.getAllCategory()
  }

  getAllCategory() {
    this.eventService.getAllEvents()
    .subscribe(res => {
      this.allEventsList = res;
    })
  }

  onEdit(id) {
    this.router.navigate(['folder/Event/Edit/' + id]);
  }

}
