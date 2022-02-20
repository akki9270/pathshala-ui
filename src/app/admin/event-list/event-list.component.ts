import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventListService } from './event-list.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {

  moment = moment;
  subParams: Subscription;

  constructor(
    public eventService: EventListService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) { }

  allEventsList;

  ngOnInit() {
    this.subParams = this.activeRoute.params.subscribe(params => {
      this.getAllCategory()
    });
  }

  getAllCategory() {
    this.eventService.getAllEvents()
      .subscribe(res => {
        this.allEventsList = res.data;
      })
  }

  onEdit(id) {
    this.router.navigate(['/Event/Edit/' + id]);
  }

  iconDisabled(date) {
    return moment(moment(date)).isBefore(moment());
  }

  ngOnDestroy() {
    this.subParams.unsubscribe();
  }

}
