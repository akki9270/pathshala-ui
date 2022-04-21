import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { StudentWiseService } from './student-wise.service';
import { ModalController } from '@ionic/angular';
import { StudentDetailsComponent } from '../../student-details/student-details.component';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-student-wise',
  templateUrl: './student-wise.component.html',
  styleUrls: ['./student-wise.component.scss'],
})
export class StudentWiseComponent implements OnInit {

  studentSearch: FormGroup;
  allStudents = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _location: Location,
    private studentWiseService: StudentWiseService,
    public modalController: ModalController,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loaderService.presentLoading();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [{ targets: 3, orderable: false }]
    };
    this.studentWiseService.studentSearch()
      .subscribe(res => {
        this.loaderService.dismisLoading();
        this.allStudents = res['data'];
        this.dtTrigger.next();
      })
  }
  async studentDetails(data) {
    const modal = await this.modalController.create({
      component: StudentDetailsComponent,
      cssClass: 'modal-fullscreen',
      componentProps: { studentId: data.id, studentPoint: data.score }
    });
    await modal.present();
  }

  backClicked() {
    this._location.back();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
