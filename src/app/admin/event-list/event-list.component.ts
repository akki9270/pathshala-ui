import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventListService } from './event-list.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { AlertController, ToastController } from '@ionic/angular';

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
    public _location: Location,
    public alertController: AlertController,
    public toastrCtrl: ToastController,
    public cdRef: ChangeDetectorRef
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
        this.cdRef.detectChanges();
      })
  }

  onEdit(id) {
    this.router.navigate(['/Event/Edit/' + id]);
  }

  async onDelete(event) {
    let control = await this.alertController.create({
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log(' id ', event.id);
          this.deleteEvent(event.id);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => { }
      }],
      message: 'Are you sure you want to delete ' + event.event_name + ' ?',
    });
    control.present();
  }

  iconDisabled(date) {
    return moment(moment(date)).isBefore(moment());
  }

  ngOnDestroy() {
    this.subParams.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/admin'])
  }

  deleteEvent(id) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.presentToast({
        message: 'Event deleted successfully',
        cssClass: 'success text-white',
        position: 'top',
      });
      this.getAllCategory();
    });
  }

  async presentToast({message, cssClass = '', position}) {
    let toast = await this.toastrCtrl.create({
      message: message,
      cssClass: cssClass,
      position: position,
      duration: 3000
    });
    toast.present();
  }
}
