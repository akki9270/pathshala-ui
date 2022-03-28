import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentWiseService } from './student-wise.service';
import { DateWiseService } from '../date-wise/date-wise.service'
import { ModalController } from '@ionic/angular';
import { StudentDetailsComponent } from '../../student-details/student-details.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-student-wise',
  templateUrl: './student-wise.component.html',
  styleUrls: ['./student-wise.component.scss'],
})
export class StudentWiseComponent implements OnInit {

  studentSearch: FormGroup;
  submited = false;
  allStudents = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _location: Location,
    private studentWiseService: StudentWiseService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.studentWiseService.studentSearch()
      .subscribe(res => {
        this.allStudents = res['data'];
        this.dtTrigger.next();
      })
  }
  async studentDetails(data) {
    const modal = await this.modalController.create({
      component: StudentDetailsComponent,
      cssClass: 'modal-fullscreen',
      componentProps: { studentId: data.id }
    });
    await modal.present();
  }


  backClicked() {
    this._location.back();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
